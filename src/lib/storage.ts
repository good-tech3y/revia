import { getDB } from "./db";
import type { Profile, Space, Resource } from "./types";

const PROFILE_ID = "local-profile";

export async function saveProfile(profile: Omit<Profile, "id">) {
  const db = await getDB();
  const record: Profile = { id: PROFILE_ID, ...profile };
  await db.put("profile", record);
  return record;
}

export async function getProfile(): Promise<Profile | undefined> {
  const db = await getDB();
  return db.get("profile", PROFILE_ID);
}

export async function listSpaces(): Promise<Space[]> {
  const db = await getDB();
  return db.getAll("spaces");
}

export async function getSpace(id: string): Promise<Space | undefined> {
  const db = await getDB();
  return db.get("spaces", id);
}

export async function saveSpace(space: Space) {
  const db = await getDB();
  await db.put("spaces", space);
  return space;
}

export async function listResources(): Promise<Resource[]> {
  const db = await getDB();
  const all = await db.getAll("resources");
  return all.sort((a, b) => b.savedAt - a.savedAt);
}

export async function getResource(id: string): Promise<Resource | undefined> {
  const db = await getDB();
  return db.get("resources", id);
}

export async function saveResource(resource: Resource) {
  const db = await getDB();
  await db.put("resources", resource);
  return resource;
}

export async function deleteResource(id: string) {
  const db = await getDB();
  await db.delete("resources", id);
}
