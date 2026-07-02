import type { MetadataRoute } from "next";

const BASE_URL = "https://fitloyalty.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // demo app surfaces — not meant for search results
      disallow: ["/overview", "/members", "/rewards", "/analytics", "/settings", "/member", "/dev"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
