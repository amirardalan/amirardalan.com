import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { PrismaClient } from '@prisma/client';
import { useSession, getSession } from 'next-auth/react';

import LoadingTriangle from '@/components/LoadingTriangle';
import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import BlogPost from '@/components/BlogPost';
import compareID from '@/utils/compareID';
import Dropdown from '@/components/Dropdown';

import { adminContent, breadcrumbContent } from '@/data/content';
import { PostProps } from '@/types/post';

const prisma = new PrismaClient();

type DraftsProps = {
  drafts: PostProps[];
  admin: {
    drafts: {
      meta: {
        title: string;
      };
      empty: string;
      empty2: string;
      empty3: string;
    };
  };
  breadcrumb: {
    blog: string;
    drafts: string;
  };
};

const Drafts = ({ drafts, admin, breadcrumb }: DraftsProps) => {
  const { data: session } = useSession();
  const isLoggedIn =
    session && session?.user?.email == process.env.NEXT_PUBLIC_USER_EMAIL;

  const Breadcrumbs = () => {
    return (
      <nav className="breadcrumbs">
        <Link href="/blog">{breadcrumb.blog}</Link>
        <span>{breadcrumb.drafts}</span>
      </nav>
    );
  };

  const [draftsList, setDraftsList] = useState<JSX.Element[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('newest');

  const sortedDrafts = drafts.sort(compareID);
  if (sortOrder === 'newest') {
    sortedDrafts.reverse();
  }

  useEffect(() => {
    const newDraftsList: JSX.Element[] = [];
    sortedDrafts.forEach((post: PostProps) => {
      const postElement = (
        <div key={post.id} className="postDraft">
          <BlogPost post={post} />
          <div className="draftInfo">
            <div className="label">Draft</div>
            <div className="category">{post.category}</div>
          </div>
        </div>
      );
      newDraftsList.push(postElement);
    });
    setDraftsList(newDraftsList);
  }, [drafts, sortOrder, sortedDrafts]);

  const RenderDrafts = () => {
    if (isLoggedIn && drafts.length < 1) {
      return (
        <>
          <Breadcrumbs />
          <div className="noDrafts draftNotification warn">
            {admin.drafts.empty}
            <Link href="/blog/create">{admin.drafts.empty2}</Link>
            {admin.drafts.empty3}
          </div>
        </>
      );
    } else if (isLoggedIn) {
      return (
        <>
          <div className="drafts">
            <div className="draftsControls">
              <Breadcrumbs />
              <div className="draftSort">
                <Dropdown
                  label="Sort by:"
                  value={sortOrder}
                  handleChange={(event) => setSortOrder(event.target.value)}
                  data={['newest', 'oldest']}
                />
              </div>
            </div>
            <main>{draftsList}</main>
          </div>
        </>
      );
    } else {
      return <LoadingTriangle />;
    }
  };

  return (
    <Container title={admin.drafts.meta.title} robots="noindex">
      <BlogStyles>
        <div className="blog admin drafts">
          <RenderDrafts />
        </div>
      </BlogStyles>
    </Container>
  );
};

export default Drafts;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: {
      drafts: JSON.parse(JSON.stringify(drafts)),
      admin: adminContent,
      breadcrumb: breadcrumbContent,
    },
  };
};
