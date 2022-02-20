import { css } from '@emotion/react'
import Image from 'next/image'

export default function NftAsset(asset: any) {

  const styleNftAsset = css({

  })

  const image_url_hires = asset.image_url.replace('s120', 's500')

  console.log(asset)



  return (
    <div css={styleNftAsset}>
      {asset.image_url}
      <h3>{asset.title}</h3>
      <p>{asset.description}</p>
      <Image
        src={image_url_hires}
        alt={asset.name}
        width={500}
        height={500}
      />
    </div>
  )
}