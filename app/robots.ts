import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elleyhill.co.zm";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/order-confirmation"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
