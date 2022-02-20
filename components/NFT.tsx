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

export default function NFT({ collection }) {

  console.log('api', collection)
  
  return (
    <>
      <h2 className="pageHeading">
        {nft.heading}
      </h2>
      <div>{nft.content}</div>
        <div css={styleNftContainer}>
      </div>
    </>
  )
}