export default function manifest() {
  return {
    name: "Revia",
    short_name: "Revia",
    description: "Save it once. Find it when it matters.",
    start_url: "/home",
    display: "standalone",
    background_color: "#faf6f1",
    theme_color: "#c1552e",
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png" },
      { src: "/icons/512", sizes: "512x512", type: "image/png" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    share_target: {
      action: "/share",
      method: "GET",
      params: { title: "title", text: "text", url: "url" },
    },
  };
}
