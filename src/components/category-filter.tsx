"use client";

const TYPE_LABELS: Record<string, string> = {
  video: "Videos", article: "Articles", documentation: "Docs", course: "Courses",
  research: "Research", social_post: "Posts", tool: "Tools", product: "Products",
  website: "Websites", other: "Other",
};

export function CategoryFilter({
  types,
  active,
  onChange,
}: {
  types: string[];
  active: string;
  onChange: (type: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {["all", ...types].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
            active === type ? "bg-clay text-white" : "bg-stone-light text-stone"
          }`}
        >
          {type === "all" ? "All" : TYPE_LABELS[type] ?? type}
        </button>
      ))}
    </div>
  );
}
