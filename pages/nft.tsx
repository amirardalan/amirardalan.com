import Container from '@/components/Container'
import Head from 'next/head'
import { nft } from '@/data/content'
import NFT from '@/components/NFT'

export default function NftPage() {

  return (
    <Container>
      <div className="nft">
        <Head>
          <title>{nft.meta.title}</title>
        </Head>
        <NFT />
      </div>
    </Container>
  )
}