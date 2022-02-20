import { css } from '@emotion/react'
import Image from 'next/image'

export default function NftAsset(asset: any) {

  const image_url_hires = asset.image_url.replace('s120', 's500')

  return (
    <div>
      <Image
        src={image_url_hires}
        alt={asset.name}
        width={500}
        height={500}
      />
      <p>{asset.name}</p>
    </div>
  )
}