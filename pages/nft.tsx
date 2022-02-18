import Container from '@/components/Container'
import { nft } from '@/data/content'
import NFT from '@/components/NFT'

export default function NftPage() {

  return (
    <Container title={nft.meta.title} description={nft.meta.description}>
      <div className="nft">
        <NFT />
      </div>
    </Container>
  )
}