import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ProjectClientPage from "./client-page";

export const revalidate = 300;

export default async function PostPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join("/");
  const data = await client.queries.project({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <ProjectClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let project = await client.queries.projectConnection();
  const allPosts = project;

  if (!allPosts.data.projectConnection.edges) {
    return [];
  }

  while (project.data?.projectConnection.pageInfo.hasNextPage) {
    project = await client.queries.projectConnection({
      after: project.data.projectConnection.pageInfo.endCursor,
    });

    if (!project.data.projectConnection.edges) {
      break;
    }

    allPosts.data.projectConnection.edges.push(
      ...project.data.projectConnection.edges,
    );
  }

  const params =
    allPosts.data?.projectConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
