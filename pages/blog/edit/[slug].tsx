import { FC, SetStateAction, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import Link from 'next/link';

import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';

import revalidateBlog from '@/lib/blog-revalidate';
import { useFetchStatus } from '@/hooks/useLoadingIndicator';

import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import BlogPostControls from '@/components/BlogPostControls';
import Dropdown from '@/components/Dropdown';
import Checkbox from '@/components/Checkbox';
import LoadingTriangle from '@/components/LoadingTriangle';

import { convertUrlToMarkdown } from '@/utils/convertUrlToMarkdown';
import { adminContent, breadcrumbContent } from '@/data/content';
import { categories } from '@/data/categories';
import BlogImageControls from '@/components/BlogImageControls';

const prisma = new PrismaClient();

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

type EditProps = {
  admin: typeof adminContent;
  breadcrumb: typeof breadcrumbContent;
  editPost: {
    id: number;
    title: string;
    slug: string;
    teaser: string;
    content: string;
    category: string;
    published: boolean;
    featured: boolean;
    showEdited: boolean;
  };
  getLatestPost: {
    id: number;
  };
};

const Edit: FC<EditProps> = ({
  admin,
  breadcrumb,
  editPost,
  getLatestPost,
}) => {
  const isPublished = editPost?.published;
  const published = isPublished;
  const id = editPost?.id;
  const latestPost = getLatestPost?.id === id;

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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertImage = (markdownUrl: string) => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const newValue =
        content.slice(0, selectionStart) +
        markdownUrl +
        content.slice(selectionEnd, content.length);
      setContent(newValue);
      textAreaRef.current.setSelectionRange(
        selectionStart + markdownUrl.length,
        selectionStart + markdownUrl.length
      );
    }
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
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data || typeof data.slug !== 'string') {
        throw new Error('Unexpected response data');
      }

      const newSlug = data.slug;
      await Router.push(`/blog/${newSlug}`);

      revalidateBlog(published, latestPost, featured, deleted, setFetchStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFetchStatus(true);
    return Router.push(`/blog/${editSlug}`);
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

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setContent(e.target.value);
  };

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
              id="content"
              name="content"
              cols={50}
              onChange={handleChange}
              placeholder={admin.input.placeholder.content}
              rows={18}
              ref={textAreaRef}
              value={content}
            />

            <div className="postOptions">
              <div className="postOptionsContainer">
                <Dropdown
                  label="Category:"
                  value={category}
                  handleChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setCategory(e.target.value)}
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

              <BlogImageControls
                onUploadSuccess={(response) =>
                  handleInsertImage(convertUrlToMarkdown(response))
                }
                handleInsertImage={handleInsertImage}
              />
            </div>

            <BlogPostControls
              admin={admin}
              post={{ id, slug, published, featured }}
              publishLabel={admin.controls.update}
              latestPost={latestPost}
              requiredFields={!content || !title || !slug || !teaser}
              submitClass="buttonCompact updateBtn"
              handleCancel={handleCancel}
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
      title={`${admin.edit.meta.title} > ${editPageTitle}`}
      robots="noindex"
    >
      <BlogStyles>
        <div>{edit}</div>
      </BlogStyles>
    </Container>
  );
};

export default Edit;
