import { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { useSession } from 'next-auth/react';
import { useFetchStatus } from '@/hooks/useLoadingIndicator';
import { uploadImage } from '@/lib/blog';

import LoadingTriangle from '@/components/LoadingTriangle';
import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import Dropdown from '@/components/Dropdown';
import Checkbox from '@/components/Checkbox';
import BlogPostControls from '@/components/BlogPostControls';
import BlogImageUpload from '@/components/BlogImageUpload';

import generateSlug from '@/utils/generateSlug';
import { adminContent, breadcrumbContent } from '@/data/content';
import { categories } from '@/data/categories';

import { DraftTypes } from '@/types/admin';

import { GetStaticProps } from 'next';
export const getStaticProps: GetStaticProps = async () => {
  return { props: { admin: adminContent, breadcrumb: breadcrumbContent } };
};

type DraftProps = DraftTypes;

const Draft: FC<DraftProps> = ({ admin, breadcrumb }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [teaser, setTeaser] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const [featured, setFeatured] = useState(false);
  const handleSetFeatured = () => {
    setFeatured(!featured);
  };

  const [fetchStatus, setFetchStatus] = useFetchStatus();
  const isFetching = fetchStatus;

  const [markdownContent, setMarkdownContent] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertUrl = (response: string) => {
    if (textAreaRef.current) {
      textAreaRef.current.value += response;
    }
  };

  const handleDeletion = () => {
    setFetchStatus(true);
    return Router.push('/blog');
  };
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFetchStatus(true);
    return Router.push('/blog');
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFetchStatus(true);
    try {
      const body = { title, slug, teaser, content, category, featured };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push(`/blog/${slug}`);
    } catch (error) {
      console.error(error);
    }
  };

  const slugUrl = generateSlug(title);

  // Ensure slug input is active after autofill
  const slugField = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let interval = setInterval(() => {
      if (slugField.current) {
        setSlug(slugField.current.value);
        clearInterval(interval);
      }
    }, 100);
  });

  const { data: session } = useSession();
  let create = null;

  if (session && session?.user?.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    create = (
      <div className="blog admin create">
        <nav className="breadcrumbs">
          <Link href="/blog">{breadcrumb.blog}</Link>
          <span>{breadcrumb.create}</span>
        </nav>

        <div>
          <form onSubmit={submitData} encType="multipart/form-data">
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder={admin.input.placeholder.title}
              type="text"
              value={title}
            />
            <input
              placeholder={admin.input.placeholder.slug}
              type="text"
              value={slugUrl}
              disabled={true}
            />
            <input
              ref={slugField}
              onInput={() => setSlug(slugUrl)}
              placeholder={slugUrl}
              type="text"
              value={slugUrl}
              hidden={true}
            />
            <input
              onChange={(e) => setTeaser(e.target.value)}
              placeholder={admin.input.placeholder.teaser}
              type="text"
              value={teaser}
            />
            <textarea
              cols={50}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder="Content"
              rows={18}
              ref={textAreaRef}
              value={markdownContent}
            />
            <BlogImageUpload
              uploadImage={uploadImage}
              onUploadSuccess={handleInsertUrl}
            />

            <div className="postOptions">
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
                  label="Featured Post"
                  title={admin.controls.checkbox.featured}
                  value={featured}
                  onChange={handleSetFeatured}
                />
              </div>
            </div>

            <div
              className={isFetching ? 'postControls disabled' : 'postControls'}
            >
              <BlogPostControls
                admin={admin}
                publishLabel={admin.controls.save}
                requiredFields={
                  !content || !title || !slug || !teaser || category === '-'
                }
                submitClass="buttonCompact saveBtn"
                handleCancel={handleCancel}
                handleDeletion={handleDeletion}
                setFetchStatus={setFetchStatus}
                deleted={false}
                isFetching={isFetching}
                latestPost={false}
                post={{
                  id: 0,
                  slug: '',
                  published: false,
                  featured: false,
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    create = <LoadingTriangle />;
  }

  return (
    <Container title={admin.create.meta.title} robots="noindex">
      <BlogStyles>
        <div>{create}</div>
      </BlogStyles>
    </Container>
  );
};

export default Draft;
