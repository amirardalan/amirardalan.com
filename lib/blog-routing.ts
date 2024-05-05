import Router from 'next/router';

// Handle routing based on the post status
export async function handlePostRouting(
  postPath: string,
  published: boolean,
  deleted: boolean
): Promise<void> {
  if (deleted && published) {
    await Router.push('/blog');
  } else if (deleted) {
    await Router.push('/blog/drafts');
  } else {
    await Router.push(postPath).then(() => Router.reload());
  }
}
