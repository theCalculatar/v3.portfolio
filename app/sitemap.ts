import type { MetadataRoute } from "next";
import client from "@/tina/__generated__/client";

const baseUrl = "https://alpheusmabetlela.com";
const FALLBACK_DATE = "2026-05-16";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectsRes = await client.queries.projectConnection();

  const projectRoutes =
    projectsRes.data.projectConnection.edges?.map((edge) => {
      const project = edge?.node;

      return {
        url: `${baseUrl}/archives/${project?._sys.filename}`,
        lastModified: project?.updatedAt ?? FALLBACK_DATE,
        priority: 0.8,
      };
    }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: FALLBACK_DATE,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: FALLBACK_DATE,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/archives`,
      lastModified: FALLBACK_DATE,
      priority: 0.9,
    },
    ...projectRoutes,
  ];
}
