import Container from '@/components/Container'
import { nft } from '@/data/content'
import NftCollection from '@/components/NftCollection'
import { GetStaticProps } from 'next'

const WALLET_ADDRESS = process.env.OPEANSEA_WALLET_ADDRESS
const X_API_KEY = process.env.OPENSEA_API_KEY
const OPENSEA_WALLET_ENDPOINT = `https://api.opensea.io/api/v1/assets?owner=${WALLET_ADDRESS}&order_direction=desc&limit=20`
const headersConfig = { Accept: 'application/json', 'X-API-KEY': `${X_API_KEY}` }

export const fetchData = async (url: string, options: Record<string, unknown>) => {
  const response = await fetch(url, {
    headers: headersConfig,
    ...options,
  })
  const data = await response.json()
  
  return data
}

export const getStaticProps: GetStaticProps = async () => {
  const url = `${OPENSEA_WALLET_ENDPOINT}`
  const options = { method: 'GET', headers: headersConfig }
  const data = await fetchData(url, options)

  if (!data) {
    return null
  }

  return { props: {data: data} }

}

const styleNftContainer = ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 4fr)',
  gap: '4rem',
  gridAutoRows: 'minmax(100px, auto)',
  lineHeight: '1.2rem',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export default function NftPage({data}) {
  
  return (
    <Container title={nft.meta.title} description={nft.meta.description} robots="noindex">
      <h1 className="pageHeading">
        {nft.heading}
      </h1>
      <div css={styleNftContainer}>
        <NftCollection data={data} />
      </div>
    </Container>
  )
}