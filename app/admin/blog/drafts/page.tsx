import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDraftPosts } from '@/db/queries/posts';
import AdminPostList from '@/components/admin/AdminPostList';
import Container from '@/components/content/Container';

export const dynamic = 'force-dynamic';

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Drafts — Amir Ardalan',
    description: 'View and manage draft blog posts in the admin panel.',
  };
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Drafts({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/drafts');
  }

  const params = (await searchParams) ?? {};
  const query = typeof params.query === 'string' ? params.query : '';
  const currentPage = Number(
    typeof params.page === 'string' ? params.page : '1'
  );
  const postsPerPage = 10;

  const drafts = await getDraftPosts();

  const filteredDrafts = drafts.filter((draft) =>
    draft.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDrafts.length / postsPerPage);
  const paginatedDrafts = filteredDrafts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalResults = filteredDrafts.length;

  return (
    <Container>
      <AdminPostList
        title="Drafts"
        posts={paginatedDrafts}
        searchPlaceholder="Search drafts..."
        query={query}
        totalResults={totalResults}
        currentPage={currentPage}
        totalPages={totalPages}
        isDrafts={true}
      />
    </Container>
  );
}
