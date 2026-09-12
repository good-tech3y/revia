import { openDB, DBSchema, IDBPDatabase } from "idb";
import type { Profile, Space, Resource } from "./types";

interface ReviaDB extends DBSchema {
  profile: {
    key: string;
    value: Profile;
  };
  spaces: {
    key: string;
    value: Space;
  };
  resources: {
    key: string;
    value: Resource;
    indexes: { "by-space": string };
  };
}

let dbPromise: Promise<IDBPDatabase<ReviaDB>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<ReviaDB>("revia", 1, {
      upgrade(db) {
        db.createObjectStore("profile", { keyPath: "id" });
        db.createObjectStore("spaces", { keyPath: "id" });
        const resourceStore = db.createObjectStore("resources", {
          keyPath: "id",
        });
        resourceStore.createIndex("by-space", "spaceId");
      },
    });
  }
  return dbPromise;
}
