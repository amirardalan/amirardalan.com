// Sort Blog posts by ID
export default function sortBlogPosts( a:any, b:any ) {
  if ( a.id < b.id ) return -1
  if ( a.id > b.id ) return 1
  return 0
}