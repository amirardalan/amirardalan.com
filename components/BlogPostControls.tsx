import { FC, MouseEventHandler } from 'react';
import Router from 'next/router';
import { publishPost, editPost, deletePost } from '@/lib/blog';
import BlogPostDelete from '@/components/BlogPostDelete';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AdminControlsTypes } from '@/types/admin';

type BlogPostControlsProps = AdminControlsTypes & {
  admin: AdminControlsTypes['admin'];
  post: {
    id: number;
    slug: string;
    published: boolean;
    featured: boolean;
  };
  latestPost: boolean;
  publishLabel: string;
  requiredFields: any;
  submitClass: string;
  handleCancel: MouseEventHandler | undefined;
  handleDeletion?: () => void;
  deleted: boolean;
  setFetchStatus: (active: boolean) => void;
  isFetching: boolean;
};

const BlogPostControls: FC<BlogPostControlsProps> = ({
  admin,
  post,
  latestPost,
  publishLabel,
  requiredFields,
  submitClass,
  handleCancel,
  deleted,
  setFetchStatus,
  isFetching,
}) => {
  const isEditPage = Router.asPath.includes('/blog/edit/');
  const isCreatePage = Router.asPath === '/blog/create';

  const handleDeletion = () => {
    setFetchStatus(true);
    return deletePost(
      post.id,
      post.published,
      latestPost,
      post.featured,
      setFetchStatus
    );
  };

  const RenderEditButton = () => {
    if (!isCreatePage) {
      return (
        <button className="buttonCompact cancelBtn" onClick={handleCancel}>
          {admin.controls.cancel}
        </button>
      );
    } else return null;
  };

  const RenderDeleteButton = () => {
    return (
      <BlogPostDelete
        handleDeletion={handleDeletion}
        cancelText={admin.controls.cancel}
        confirmText={admin.controls.confirm}
        deleteText={admin.controls.delete}
      />
    );
  };

  const RenderLoadingSpinner = () => {
    return isFetching ? <LoadingSpinner size={30} /> : null;
  };

  // Create & Edit Page Controls
  if (isEditPage || isCreatePage) {
    return (
      <div className={isFetching ? 'postControls disabled' : 'postControls'}>
        <button className={submitClass} disabled={requiredFields} type="submit">
          {publishLabel}
        </button>
        <RenderEditButton />
        <RenderDeleteButton />
        <RenderLoadingSpinner />
      </div>
    );
  }

  // Slug Page Controls
  else if (!isEditPage && !isCreatePage) {
    return (
      <div className={isFetching ? 'postControls disabled' : 'postControls'}>
        <button
          className="buttonCompact publishBtn"
          onClick={() =>
            publishPost(
              post.id,
              post.published,
              latestPost,
              post.featured,
              deleted,
              setFetchStatus
            )
          }
        >
          {publishLabel}
        </button>
        <button
          className="buttonCompact"
          onClick={() => editPost(post.slug, setFetchStatus)}
        >
          {admin.controls.edit}
        </button>
        <RenderDeleteButton />
        <RenderLoadingSpinner />
      </div>
    );
  }

  return <></>;
};

export default BlogPostControls;
