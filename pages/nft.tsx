import Container from '@/components/Container'
import { nft } from '@/data/content'
import NFT from '@/components/NFT'

export default function NftPage() {

  return (
    <Container title={nft.meta.title}>
      <div className="nft">
        <NFT />
      </div>
    </Container>
  )
}