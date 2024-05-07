const fetcher = async (...args: [string]) => {
  // if (
  //   typeof window !== 'undefined' &&
  //   window.location.hostname === 'localhost'
  // ) {
  //   return Promise.resolve({ likes: 0 });
  // }

  const res = await fetch(...args);
  return res.json();
};

export default fetcher;
