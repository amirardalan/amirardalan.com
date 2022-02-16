import Head from 'next/head'
import { nft } from '@/data/content'
import NFT from '@/components/NFT'

export default function NftPage() {

  return (
    <div className="container nft">
      <Head>
        <title>{nft.meta.title}</title>
      </Head>
      <NFT />
    </div>
  )
}