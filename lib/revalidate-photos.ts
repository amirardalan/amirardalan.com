const revalidatePhotos = async () => {
  const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;
  const VERCEL_URL = process.env.VERCEL_URL;

  try {
    await fetch(
      `https://${VERCEL_URL}/api/revalidate?secret=${REVALIDATE_SECRET}&path=/photos`
    );
  } catch (error) {
    console.error((error as Error).message);
    throw error;
  }
};

export default revalidatePhotos;
