// Sort Blog posts by ID
type SortID = { id: number }

export default function sortBlogPosts(a: SortID, b: SortID) {
  if ( a.id < b.id ) return -1
  if ( a.id > b.id ) return 1
  return 0
}