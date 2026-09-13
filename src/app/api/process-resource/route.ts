import { NextRequest, NextResponse } from "next/server";
import { Agent, tool } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { z } from "zod";

export const maxDuration = 30;

const LANGUAGE_NAMES: Record<string, string> = { en: "English", es: "Spanish", fr: "French" };

const ResourceDecisionSchema = z.object({
  title: z.string().max(120).describe("A clear, concise title."),
  description: z.string().max(220).describe("A short, factual one to two sentence description."),
  resourceType: z.enum(["video","article","documentation","course","research","social_post","tool","product","website","other"]),
  spaceName: z.string().max(40).describe("Reuse an existing Space if one fits, otherwise propose a short new name."),
  tags: z.array(z.string()).max(5),
  reasoning: z.string().max(200),
  thumbnailUrl: z.string().url().nullable().describe("Copy the image field from fetch_resource exactly if one was found, otherwise null. Never invent one."),
});

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function extractMeta(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return null;
}

const fetchResourceTool = tool({
  name: "fetch_resource",
  description: "Fetch a URL and extract its title, description, site name, and preview image.",
  inputSchema: z.object({ url: z.string().url() }),
  callback: async (input) => {
    try {
      const host = new URL(input.url).hostname.replace("www.", "");
      if (host === "youtube.com" || host === "youtu.be") {
        try {
          const oembedRes = await fetchWithTimeout(`https://www.youtube.com/oembed?url=${encodeURIComponent(input.url)}&format=json`, {}, 5000);
          if (oembedRes.ok) {
            const data = await oembedRes.json();
            return { fetched: true, title: data.title ?? null, description: null, siteName: "YouTube", image: data.thumbnail_url ?? null };
          }
        } catch {}
      }
      const res = await fetchWithTimeout(input.url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; ReviaBot/1.0)" }, redirect: "follow" }, 8000);
      const html = await res.text();
      const titleTag = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null;
      return {
        fetched: true,
        title: extractMeta(html, "og:title") || titleTag,
        description: extractMeta(html, "og:description"),
        siteName: extractMeta(html, "og:site_name") || host,
        image: extractMeta(html, "og:image"),
      };
    } catch {
      return { fetched: false, error: "Could not reach that URL in time." };
    }
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, spaces, profile } = body as {
    url: string;
    spaces: { id: string; name: string }[];
    profile: { userType: string; contextTags: string[]; language?: string } | null;
  };
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "Server is missing a Groq API key." }, { status: 500 });
  }

  const listSpacesTool = tool({
    name: "list_spaces",
    description: "List existing Spaces so you can reuse one instead of duplicating.",
    inputSchema: z.object({}),
    callback: () => spaces.map((s) => s.name),
  });

  const model = new OpenAIModel({
    api: "chat",
    apiKey: process.env.GROQ_API_KEY,
    clientConfig: { baseURL: "https://api.groq.com/openai/v1" },
    modelId: "openai/gpt-oss-20b",
  });

  const languageName = LANGUAGE_NAMES[profile?.language ?? "en"] ?? "English";

  const agent = new Agent({
    model,
    systemPrompt: `You are Revia's resource assistant. User context: ${profile ? `${profile.userType}, interested in ${profile.contextTags.join(", ") || "general topics"}.` : "unknown."}
Write the title, description, space name, tags, and reasoning in ${languageName}, written naturally for a native speaker, not a literal word-for-word translation.
Always call fetch_resource first. Call list_spaces before deciding. Never invent facts. Copy the image field from fetch_resource into thumbnailUrl exactly if present, otherwise null, never invent one. If the fetch failed, say so in the description.`,
    tools: [fetchResourceTool, listSpacesTool],
    structuredOutputSchema: ResourceDecisionSchema,
  });

  try {
    const result = await agent.invoke(`Process this URL: ${url}`);
    return NextResponse.json({ decision: result.structuredOutput });
  } catch (err) {
    console.error("[process-resource] agent invoke failed:", err);
    return NextResponse.json({ error: "The agent could not process that link." }, { status: 500 });
  }
}
