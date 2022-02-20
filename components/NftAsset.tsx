import { css } from '@emotion/react'
import Image from 'next/image'

export default function NftAsset(asset: any) {

  const styleNftAsset = css({
    '.assetName': {
      marginTop: '.3rem',
      lineHeight: '1.2rem'
    }
  })

  const image_url_hires = asset.image_url?.replace('s120', 's500') ?? '/images/nft-placeholder.jpg'

  return (
    <div css={styleNftAsset}>
      <Image
        src={image_url_hires}
        alt={asset.name}
        width={430}
        height={430}
      />
      <p className="assetName">
        {asset.name}
      </p>
    </div>
  )
}