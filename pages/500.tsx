import Container from '@/components/Container'
import { errorContent } from '@/data/content'

import { GetStaticProps } from 'next'
import ErrorLayout from '@/components/ErrorLayout'
export const getStaticProps: GetStaticProps = async () => {
  return { props: { error: errorContent.internalServerError } }
}

export default function CustomError({ error }) {

  return(
    <Container title={error.title} robots="noindex">
      <ErrorLayout error={error} />
    </Container>
  )
}