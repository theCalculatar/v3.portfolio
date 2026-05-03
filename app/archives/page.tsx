import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import ProjectClientPage from "./client-page";
import { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Project Archives",
  description:
    "A curated archive of projects, experiments, and shipped work by Alpheus Mabetlela — capturing how ideas evolved into structured, working systems.",

  openGraph: {
    title: "Project Archives | Alpheus Mabetlela",
    description:
      "Explore Alpheus Mabetlela’s project archive — a collection of real builds, experiments, and systems shaped through iteration and problem-solving.",
    url: "https://alpheusmabetlela.com/archives",
    siteName: "Alpheus Mabetlela",
    images: [
      {
        url: "https://alpheusmabetlela.com/blocks/projects-page.webp",
        width: 1200,
        height: 630,
        alt: "Alpheus Mabetlela Project Archives",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Project Archives | Alpheus Mabetlela",
    description:
      "Past work, real builds, and experiments from Alpheus Mabetlela — a timeline of ideas built, tested, and refined.",
    images: ["https://alpheusmabetlela.com/blocks/projects-page.webp"],
  },
};

export default async function ProjectPage() {
  let project = await client.queries.projectConnection({
    sort: "date",
    last: 1,
  });
  const allProject = project;

  if (!allProject.data.projectConnection.edges) {
    return [];
  }

  while (project.data?.projectConnection.pageInfo.hasPreviousPage) {
    project = await client.queries.projectConnection({
      sort: "date",
      before: project.data.projectConnection.pageInfo.endCursor,
    });

    if (!project.data.projectConnection.edges) {
      break;
    }

    allProject.data.projectConnection.edges.push(
      ...project.data.projectConnection.edges.reverse(),
    );
  }

  return (
    <Layout rawPageData={allProject.data}>
      <ProjectClientPage {...allProject} />
    </Layout>
  );
}
