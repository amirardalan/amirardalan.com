import ReactMarkdown from 'react-markdown'
import BlogSyntaxHighlight from '@/components/BlogSyntaxHighlight'
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import link from 'rehype-autolink-headings'

export default function BlogMarkdown({ props }) {
  return (
    <ReactMarkdown
      rehypePlugins={[ [gfm], [rehypeSlug], [link] ]}
      components={BlogSyntaxHighlight}
      children={props.post.content}
    />
  )
}