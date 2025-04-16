'use client';

import BlogPostAdminControls from './BlogPostAdminControls';

export default function BlogPostAdminControlsWrapper({
  slug,
}: {
  slug: string;
}) {
  return <BlogPostAdminControls slug={slug} />;
}
