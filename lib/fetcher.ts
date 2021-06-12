export default async function Fetcher(...args: any) {
  const res = await fetch(void 0,...args)

  return res.json()
}