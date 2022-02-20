import { css } from '@emotion/react'
import Image from 'next/image'

export default function NftAsset(asset: any) {

  const styleNftAsset = css({

})

  console.log(asset)

  return (
    <div css={styleNftAsset}>
      <h3>{asset.title}</h3>
      <p>{asset.description}</p>
      <Image
        src={asset.image_url}
        alt={asset.name}
        width="120"
        height="120"
      />
    </div>
  )
}