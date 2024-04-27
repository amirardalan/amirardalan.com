const revalidatePhotos = (setFetchStatus: Function) => {
  const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
  const revalidatePath = '/photos';

  const photos = fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=${revalidatePath}`);

  setFetchStatus(true);

  photos
    .then(() => {
      setFetchStatus(false);
    })
    .catch((error) => {
      console.error('Error revalidating photos:', error);
      setFetchStatus(false);
    });
};

export default revalidatePhotos;