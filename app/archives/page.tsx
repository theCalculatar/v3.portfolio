import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import ProjectClientPage from './client-page';

export const revalidate = 300;

export default async function ProjectPage() {
  let project = await client.queries.projectConnection({
    sort: 'date',
    last: 1
  });
  const allProject = project;

  if (!allProject.data.projectConnection.edges) {
    return [];
  }

  while (project.data?.projectConnection.pageInfo.hasPreviousPage) {
    project = await client.queries.projectConnection({
      sort: 'date',
      before: project.data.projectConnection.pageInfo.endCursor,
    });

    if (!project.data.projectConnection.edges) {
      break;
    }

    allProject.data.projectConnection.edges.push(...project.data.projectConnection.edges.reverse());
  }

  return (
    <Layout rawPageData={allProject.data}>
      <ProjectClientPage {...allProject} />
    </Layout>
  );
}
