"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { listSpaces, saveSpace, saveResource, getProfile, listResources } from "@/lib/storage";
import { findConnection } from "@/lib/connections";
import type { ResourceType, Space, Resource } from "@/lib/types";

export const PROCESSING_STEPS = [
  "Resource received",
  "Reading the link",
  "Figuring out what it is",
  "Deciding where it belongs",
  "Saved",
] as const;

export function useSaveResource() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const save = async (rawUrl: string) => {
    const trimmedUrl = rawUrl.trim();
    if (!trimmedUrl) return;

    let parsed: URL;
    try {
      parsed = new URL(trimmedUrl);
    } catch {
      setError("That doesn't look like a full link. Copy the whole address, starting with https://.");
      return;
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      setError("Only http and https links are supported.");
      return;
    }

    setError(null);
    setProcessing(true);
    setCompletedSteps([]);

    let stepIndex = 0;
    const timer = setInterval(() => {
      if (stepIndex < PROCESSING_STEPS.length - 1) {
        setCompletedSteps((prev) => [...prev, PROCESSING_STEPS[stepIndex]]);
        stepIndex++;
      }
    }, 700);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const [spaces, profile] = await Promise.all([listSpaces(), getProfile()]);

      const res = await fetch("/api/process-resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmedUrl,
          spaces,
          profile: profile ? { userType: profile.userType, contextTags: profile.contextTags, language: profile.language } : null,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("agent failed");
      const { decision } = await res.json();

      clearInterval(timer);
      setCompletedSteps(PROCESSING_STEPS.slice(0, PROCESSING_STEPS.length - 1));

      let space: Space | undefined = spaces.find((s) => s.name.toLowerCase() === decision.spaceName.toLowerCase());
      if (!space) {
        space = { id: crypto.randomUUID(), name: decision.spaceName, createdBy: "agent" };
        await saveSpace(space);
      }

      const savedRecord: Resource = {
        id: crypto.randomUUID(),
        url: trimmedUrl,
        title: decision.title,
        description: decision.description,
        resourceType: decision.resourceType as ResourceType,
        spaceId: space.id,
        tags: decision.tags,
        thumbnailUrl: decision.thumbnailUrl ?? undefined,
        savedAt: Date.now(),
        reasoning: decision.reasoning,
      };
      await saveResource(savedRecord);

      const allResources = await listResources();
      const connection = findConnection(savedRecord, allResources);
      if (connection) sessionStorage.setItem("revia:notification", connection.reason);

      setCompletedSteps([...PROCESSING_STEPS]);
      await new Promise((r) => setTimeout(r, 400));
      router.push("/home");
    } catch (err) {
      clearTimeout(timeoutId);
      clearInterval(timer);
      if (err instanceof Error && err.name === "AbortError") {
        setError("That took too long. The link might be slow or blocking access.");
      } else {
        setError("Something went wrong saving that link. Try again.");
      }
      setProcessing(false);
    }
  };

  return { save, processing, completedSteps, error };
}
