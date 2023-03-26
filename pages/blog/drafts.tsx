import { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { useSession, getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

import LoadingTriangle from '@/components/LoadingTriangle';
import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import BlogPost from '@/components/BlogPost';

import { adminContent, breadcrumbContent } from '@/data/content';

import { PostProps } from '@/types/post';

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

  useEffect(() => {
    const newDraftsList: JSX.Element[] = [];
    drafts.forEach((post: PostProps) => {
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
  }, [drafts]);

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
          <Breadcrumbs />
          <div className="drafts">
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
