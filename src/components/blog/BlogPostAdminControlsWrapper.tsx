'use client';

import BlogPostAdminControls from './BlogPostAdminControls';

export default function BlogPostAdminControlsWrapper({
  slug,
  published,
}: {
  slug: string;
  published: boolean;
}) {
  return <BlogPostAdminControls slug={slug} published={published} />;
}
