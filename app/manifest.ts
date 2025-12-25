import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Miauzly - Katzensitter App",
    short_name: "Miauzly",
    description: "Finde Katzensitter oder biete Katzenbetreuung an",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5682D3",
    orientation: "portrait",
    icons: [
      {
        src: "/app-icon.jpg",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app-icon.jpg",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["lifestyle", "social"],
    lang: "de",
  }
}
