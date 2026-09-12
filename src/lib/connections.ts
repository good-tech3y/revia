import type { Resource } from "./types";

export function findConnection(newResource: Resource, existing: Resource[]): { reason: string } | null {
  const others = existing.filter((r) => r.id !== newResource.id);
  const sharedTagMatches = others.filter((r) => r.tags.some((tag) => newResource.tags.includes(tag)));
  if (sharedTagMatches.length >= 2) {
    const tag = sharedTagMatches[0].tags.find((t) => newResource.tags.includes(t));
    return { reason: `Connected to ${sharedTagMatches.length} things you saved before tagged "${tag}".` };
  }
  const sameSpace = others.filter((r) => r.spaceId === newResource.spaceId);
  if (sameSpace.length >= 2) {
    return { reason: `You now have ${sameSpace.length + 1} things saved in this Space.` };
  }
  return null;
}
