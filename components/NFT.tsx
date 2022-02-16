import { nft } from '@/data/content'


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

export default function NFT() {
  
  return (
    <>
      <h2 className="pageHeading">
        {nft.heading}
      </h2>
      <div css={styleNftContainer}>
        <div>NFT 1</div>
        <div>NFT 2</div>
        <div>NFT 3</div>
        <div>NFT 4</div>
        <div>NFT 5</div>
        <div>NFT 6</div>
        <div>NFT 7</div>
        <div>NFT 8</div>
      </div>
    </>
  )
}