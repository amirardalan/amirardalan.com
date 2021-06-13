export default async function Fetcher(...args: any) {
  const res = await fetch(...args)

  return res.json()
}