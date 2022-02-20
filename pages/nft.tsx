import Container from '@/components/Container'
import { nft } from '@/data/content'
import NftCollection from '@/components/NftCollection'
import { GetStaticProps } from 'next'


const WALLET_ADDRESS = process.env.NEXT_PUBLIC_OPEANSEA_WALLET_ADDRESS
const OPENSEA_WALLET_ENDPOINT = `https://api.opensea.io/api/v1/collections?asset_owner=${WALLET_ADDRESS}`

export const fetchData = async (url: string, options: Record<string, unknown>) => {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    ...options,
  })
  const data = await response.json()
  return data
}

export const getStaticProps: GetStaticProps = async () => {
  const url = `${OPENSEA_WALLET_ENDPOINT}`
  const options = { method: 'GET', headers: {Accept: 'application/json'} }
  const data = await fetchData(url, options)

  if (!data) {
    return null
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(data))
    }
  }

}

const styleNftContainer = ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '4rem',
  gridAutoRows: 'minmax(100px, auto)',
  lineHeight: '1.2rem',
  'ul li, a': {
    marginBottom: '1rem',
    color: 'var(--color-gray)',
  },
  'h3, h4, h5, h6': {
    fontFamily: 'var(--font-secondary)',
  }
})

export default function NftPage({ data }) {
  

  return (
    <Container title={nft.meta.title} description={nft.meta.description}>
      <div className="nft">
        <h2 className="pageHeading">
          {nft.heading}
        </h2>
        <div>{nft.content}</div>
          <div css={styleNftContainer}>
        </div>
        <NftCollection data={data} />
      </div>
    </Container>
  )
}