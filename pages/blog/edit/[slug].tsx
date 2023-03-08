import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Router from 'next/router';
import { deletePost } from '@/lib/blog';
import revalidateChanges from '@/lib/revalidate';
import { useFetchStatus } from '@/utils/useLoadingIndicator';

import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import Link from 'next/link';
import BlogPostControls from '@/components/BlogPostControls';
import Dropdown from '@/components/Dropdown';
import Checkbox from '@/components/Checkbox';
import LoadingTriangle from '@/components/LoadingTriangle';

import { adminContent, breadcrumbContent } from '@/data/content';
import { categories } from '@/data/categories';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [editPost, getLatestPost] = await prisma.$transaction([
    prisma.post.findFirst({
      where: { slug: String(params?.slug) },
    }),
    prisma.post.findFirst({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: { id: true },
    }),
  ]);
  return {
    props: {
      admin: adminContent,
      breadcrumb: breadcrumbContent,
      editPost: JSON.parse(JSON.stringify(editPost)),
      getLatestPost: getLatestPost,
    },
  };
};

const Edit = ({ admin, breadcrumb, editPost, getLatestPost }) => {
  const isPublished = editPost?.published;
  const published = isPublished;
  const id = editPost?.id;
  const latestPost = getLatestPost?.id === id;
  const redirect = isPublished ? '/blog' : '/blog/drafts';

  const editTitle = editPost?.title;
  const editPageTitle = isPublished ? editTitle : editTitle + ' (draft)';
  const editContent = editPost?.content;
  const editSlug = editPost?.slug;
  const editTeaser = editPost?.teaser;
  const editCategory = editPost?.category;
  const editFeatured = editPost?.featured;
  const editEdited = editPost?.showEdited;

  const [title, setTitle] = useState(editTitle);
  const [content, setContent] = useState(editContent);
  const [slug, setSlug] = useState(editSlug);
  const [teaser, setTeaser] = useState(editTeaser);
  const [category, setCategory] = useState(editCategory);

  const [featured, setFeatured] = useState(editFeatured);
  const handleSetFeatured = () => {
    setFeatured(!featured);
  };

  const [showEdited, setShowEdited] = useState(editEdited);
  const handleShowEdited = () => {
    setShowEdited(!showEdited);
  };

  const [fetchStatus, setFetchStatus] = useFetchStatus();
  const isFetching = fetchStatus;
  const deleted = false;

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFetchStatus(true);
    try {
      const body = {
        id,
        title,
        slug,
        teaser,
        content,
        category,
        featured,
        editFeatured,
        showEdited,
      };
      await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(() =>
        revalidateChanges(
          published,
          latestPost,
          featured,
          deleted,
          setFetchStatus
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFetchStatus(true);
    return Router.push(`/blog/${editSlug}`);
  };
  const handleDeletion = () => {
    setFetchStatus(true);
    return deletePost(id, published, latestPost, featured, setFetchStatus);
  };

  const { data: session } = useSession();
  const userHasValidSession = Boolean(session);
  const userHasValidEmail =
    session?.user?.email === process.env.NEXT_PUBLIC_USER_EMAIL;
  let edit = null;

  if (!userHasValidSession) {
    return (
      <Container>
        <div>
          <LoadingTriangle />
        </div>
      </Container>
    );
  }

  if (userHasValidSession && userHasValidEmail) {
    edit = (
      <div className="blog admin edit">
        <nav className="breadcrumbs">
          <Link href="/blog">{breadcrumb.blog}</Link>
          <span>
            {breadcrumb.edit} – {editPageTitle}
          </span>
        </nav>

        <div>
          <form onSubmit={submitData}>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder={admin.input.placeholder.title}
              type="text"
              value={title}
            />
            <input
              onChange={(e) => setSlug(e.target.value)}
              placeholder={admin.input.placeholder.slug}
              type="text"
              value={slug}
            />
            <input
              onChange={(e) => setTeaser(e.target.value)}
              placeholder={admin.input.placeholder.teaser}
              type="text"
              value={teaser}
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder={admin.input.placeholder.content}
              rows={18}
              value={content}
            />

            <div className="postOptions">
              <Dropdown
                label="Category:"
                value={category}
                handleChange={(e) => setCategory(e.target.value)}
                data={categories}
              />
              <div className="checkbox">
                <Checkbox
                  label="Featured"
                  title={admin.controls.checkbox.featured}
                  value={featured}
                  onChange={handleSetFeatured}
                />
              </div>
              <div className="checkbox">
                <Checkbox
                  label="Update Date"
                  title={admin.controls.checkbox.updateDate}
                  value={showEdited}
                  onChange={handleShowEdited}
                />
              </div>
            </div>

            <BlogPostControls
              admin={admin}
              post={id}
              publishLabel={admin.controls.update}
              latestPost={latestPost}
              requiredFields={!content || !title || !slug || !teaser}
              submitClass="buttonCompact updateBtn"
              handleCancel={handleCancel}
              handleDeletion={handleDeletion}
              setFetchStatus={setFetchStatus}
              deleted={false}
              isFetching={isFetching}
            />
          </form>
        </div>
      </div>
    );
  }

  return (
    <Container
      title={admin.edit.meta.title}
      {...editPageTitle}
      robots="noindex"
    >
      <BlogStyles>
        <div>{edit}</div>
      </BlogStyles>
    </Container>
  );
};

export default Edit;
