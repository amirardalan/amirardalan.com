import Router from 'next/router';

const revalidateChanges = (
  pageType: 'blog' | 'photos',
  setFetchStatus?: Function,
  published?: boolean,
  latestPost?: boolean,
  featured?: boolean,
  deleted?: boolean
) => {
  const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;
  const isEditPage = Router.asPath.includes(`/${pageType}/edit/`);
  const revalidatePath = isEditPage
    ? Router.asPath.replace('/edit', '')
    : Router.asPath;

  const fetchRequests = [];

  if (pageType === 'blog') {
    const post = fetch(
      `/api/revalidate?secret=${REVALIDATE_SECRET}&path=${revalidatePath}`
    );
    fetchRequests.push(post);

    if (featured || latestPost) {
      const home = fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/`);
      fetchRequests.push(home);
    }
  }

  const page = fetch(
    `/api/revalidate?secret=${REVALIDATE_SECRET}&path=/${pageType}`
  );
  fetchRequests.push(page);

  setFetchStatus && setFetchStatus(true);

  Promise.all(fetchRequests)
    .then(() => {
      // Deleted Posts
      if (deleted && published) {
        Router.push(`/${pageType}`);
        return;
      } else if (deleted) {
        Router.push('/blog/drafts');
        return;
      }
      // All other Posts
      Router.push(revalidatePath).then(() => Router.reload());
    })
    .catch((error) => {
      console.error(error.message);
    });
};

export default revalidateChanges;
