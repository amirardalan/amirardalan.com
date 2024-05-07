const fetcher = async (...args: [string]) => {
  const res = await fetch(...args);
  return res.json();
};

export default fetcher;
