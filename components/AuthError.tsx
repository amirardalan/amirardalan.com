import { blog } from '@/data/content'

export default function AuthError() {
  return (
    <div css={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <span>{blog.error.auth}</span>
    </div>
  )
}