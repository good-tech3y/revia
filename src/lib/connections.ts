import type { Resource } from "./types";

export function findConnection(newResource: Resource, existing: Resource[]): { reason: string } | null {
  const others = existing.filter((r) => r.id !== newResource.id);

  const sharedTagMatch = others.find((r) => r.tags.some((tag) => newResource.tags.includes(tag)));
  if (sharedTagMatch) {
    const tag = sharedTagMatch.tags.find((t) => newResource.tags.includes(t));
    return { reason: `Connected to something you saved before, both tagged "${tag}".` };
  }

  const sameSpace = others.filter((r) => r.spaceId === newResource.spaceId);
  if (sameSpace.length >= 1) {
    return { reason: `You now have ${sameSpace.length + 1} things saved in this Space.` };
  }

  return null;
}
