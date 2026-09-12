"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getResource, saveResource, deleteResource, listSpaces } from "@/lib/storage";
import type { Resource, Space } from "@/lib/types";

export default function ResourceDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [spaceId, setSpaceId] = useState("");

  useEffect(() => {
    (async () => {
      const [r, allSpaces] = await Promise.all([getResource(params.id), listSpaces()]);
      if (r) {
        setResource(r);
        setTitle(r.title);
        setDescription(r.description);
        setTagsInput(r.tags.join(", "));
        setSpaceId(r.spaceId);
      }
      setSpaces(allSpaces);
      setLoading(false);
    })();
  }, [params.id]);

  const spaceName = spaces.find((s) => s.id === resource?.spaceId)?.name;

  const handleSave = async () => {
    if (!resource) return;
    const updated: Resource = {
      ...resource,
      title: title.trim() || resource.title,
      description: description.trim(),
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      spaceId,
    };
    await saveResource(updated);
    setResource(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!resource) return;
    await deleteResource(resource.id);
    router.push("/home");
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
        <p className="text-sm text-stone">Loading...</p>
      </main>
    );
  }

  if (!resource) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <h1 className="text-xl font-bold text-ink">Not found</h1>
        <p className="mt-2 text-sm text-stone">This resource may have already been deleted.</p>
        <Link href="/home" className="mt-6 text-sm text-clay underline">Back to library</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-12">
      <Link href="/home" className="mb-6 text-sm text-stone hover:text-ink">‹ Home</Link>

      {resource.thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={resource.thumbnailUrl} alt="" className="mb-6 h-40 w-full rounded-2xl object-cover" />
      )}

      {!editing ? (
        <>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-clay-dark/10 px-2 py-0.5 text-xs font-semibold text-clay-dark">
              {resource.resourceType}
            </span>
            {spaceName && <span className="text-xs text-stone">{spaceName}</span>}
          </div>
          <h1 className="mt-2 text-xl font-bold text-ink">{resource.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-stone">{resource.description}</p>

          {resource.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-stone-light px-2 py-0.5 text-xs text-stone">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-stone-light bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">Why here?</p>
            <p className="mt-2 text-sm text-stone">{resource.reasoning}</p>
          </div>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 rounded-full border border-stone-light px-6 py-3 text-center text-sm font-semibold text-ink"
          >
            Open original
          </a>

          <div className="mt-4 flex gap-3">
            <button onClick={() => setEditing(true)} className="flex-1 rounded-full border border-stone-light px-6 py-3 text-sm font-semibold text-ink">
              Edit
            </button>
            <button onClick={() => setConfirmingDelete(true)} className="flex-1 rounded-full border border-clay-dark px-6 py-3 text-sm font-semibold text-clay-dark">
              Delete
            </button>
          </div>

          {confirmingDelete && (
            <div className="mt-4 rounded-2xl border border-clay-dark bg-surface p-4">
              <p className="text-sm text-ink">Delete this saved resource? This can't be undone.</p>
              <div className="mt-3 flex gap-3">
                <button onClick={() => setConfirmingDelete(false)} className="flex-1 rounded-full border border-stone-light px-4 py-2 text-sm font-semibold text-ink">
                  Cancel
                </button>
                <button onClick={handleDelete} className="flex-1 rounded-full bg-clay-dark px-4 py-2 text-sm font-semibold text-white">
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <label className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay" />

          <label className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay" />

          <label className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone">Space</label>
          <select value={spaceId} onChange={(e) => setSpaceId(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay">
            {spaces.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <label className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone">Tags (comma separated)</label>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay" />

          <div className="mt-6 flex gap-3">
            <button onClick={() => setEditing(false)} className="flex-1 rounded-full border border-stone-light px-6 py-3 text-sm font-semibold text-ink">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white">
              Save
            </button>
          </div>
        </>
      )}
    </main>
  );
}
