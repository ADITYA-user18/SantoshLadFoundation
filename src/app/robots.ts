import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "production" ? "https://www.santoshladfoundation.org" : "http://localhost:3000");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "ChatGPT-User",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
          "FacebookBot",
          "Amazonbot",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

