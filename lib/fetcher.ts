export default async function Fetcher(...args: [string]) {
  const res = await fetch(...args);

  return res.json();
}
