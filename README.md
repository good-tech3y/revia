# Revia

Save it once. Find it when it matters.

Built for the [Agents for Humans](https://agentsforhumans.devpost.com/) hackathon, Professional Agents track.

## Table of Contents

- [What Revia does](#what-revia-does)
- [The problem](#the-problem)
- [How it works](#how-it-works)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [The Strands agent](#the-strands-agent)
- [Current limitations](#current-limitations)
- [License](#license)

## What Revia does

Revia is an information capture and resurfacing agent. Share a link with it, and it reads the resource, decides where it belongs based on who you are and what you've already saved, writes a short honest description, and remembers it. Later, when something you save connects to something you saved before, it tells you, with a reason, not a generic notification.

## The problem

People save things they mean to come back to: an article, a tool, a video, a tutorial. Most of it never gets opened again, because a bookmark folder doesn't know why you saved something or when you'll actually need it. Revia takes on that responsibility instead of leaving it to a flat list.

## How it works

1. **Share it.** Send a link to Revia from your phone's share menu, or paste one directly.
2. **Revia understands it.** A Strands agent fetches the resource, figures out what it actually is, and decides where it belongs.
3. **Find it when it matters.** Saved resources are grouped into Spaces and categories, searchable, and Revia flags real connections between what you've saved as they come up.

## Architecture

```mermaid
flowchart TD
    A[User shares or pastes a link] --> B["/api/process-resource (Next.js route)"]
    B --> C[Strands Agent]
    C --> D[fetch_resource tool]
    D --> E[Target URL or YouTube oEmbed]
    C --> F[list_spaces tool]
    F --> G[Existing Spaces, passed in from the client]
    C --> H["Structured output: title, description, type, space, tags, reasoning"]
    H --> B
    B --> I[Client]
    I --> J["IndexedDB: Profile, Spaces, Resources"]
    J --> K[Home: categorized library]


## The agent runs server side per share event. It decides which tools to call and in what order, it isn't a fixed pipeline. Local mode keeps all user data in the browser; the server never stores anything, it only processes one request and returns a decision.
Tech stack
Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4
Strands Agents SDK for the agent loop, tools, and structured output
Model access through an OpenAI-compatible endpoint (currently Groq)
IndexedDB (via the idb package) for local-first storage, no account required
PWA: installable, Web Share Target API, custom manifest and service worker
Getting started

git clone <this-repo-url>
cd revia
npm install
echo "GROQ_API_KEY=your-key-here" > .env.local
npm run dev

Open the app in an actual browser tab (not an embedded preview) to test installability and the share target.
Project structure

src/
  app/
    page.tsx            landing page
    onboarding/          profile setup
    home/                the library
    save/                manual link entry
    share/               real Web Share Target receiver
    resource/[id]/       resource detail, edit, delete
    search/              local search
    profile/             notifications, language, account status
    api/process-resource/  the agent route
  components/            shared UI (cards, menu, install icon, toasts)
  lib/                   storage layer, types, agent-adjacent helpers

The Strands agent
Two tools, deliberately minimal:
fetch_resource(url): deterministic. YouTube links use the oEmbed endpoint; everything else gets a server-side fetch and an Open Graph meta tag scrape.
list_spaces(): returns the user's existing Spaces so the agent reuses one instead of creating a duplicate.
There's no separate save tool. The agent's structured output (title, description, type, Space, tags, and its own reasoning) is the final answer, validated against a schema with automatic retry on malformed output. The client is what writes it to IndexedDB.
Current limitations
Being upfront about what isn't built yet:
No account creation or cross-device sync, local storage only
No Bedrock/AgentCore deployment (AWS account verification is blocked on our end, unrelated to the SDK itself)
Share Target requires installing the app; iOS Safari doesn't support the Web Share Target API, the manual paste flow works everywhere as a fallback
Interface is English only right now
License
MIT, see LICENSE.

**Before deploying, one real fix.** Vercel's free tier defaults serverless functions to a 10 second timeout unless told otherwise, and our agent call can take longer than that. Without this, saves would work in dev and silently fail in production:
sed -i '1a\nexport const maxDuration = 30;' src/app/api/process-resource/route.ts
