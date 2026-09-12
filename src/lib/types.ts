export type UserType = "student" | "worker" | "organization";

export interface Profile {
  id: string;
  name: string;
  userType: UserType;
  organizationName?: string;
  contextTags: string[];
}

export interface Space {
  id: string;
  name: string;
  createdBy: "user" | "agent";
}

export type ResourceType =
  | "video"
  | "article"
  | "documentation"
  | "course"
  | "research"
  | "social_post"
  | "tool"
  | "product"
  | "website"
  | "other";

export interface Resource {
  id: string;
  url: string;
  canonicalUrl?: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  spaceId: string;
  tags: string[];
  thumbnailUrl?: string;
  sourceName?: string;
  savedAt: number;
  reasoning: string;
}
