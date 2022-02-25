import { css } from '@emotion/react'
import Image from 'next/image'

export default function NftAsset(asset: any) {

  const styleNftAsset = css({
    '.assetName': {
      marginTop: '.3rem',
      lineHeight: '1.2rem'
    }
  })

  return (
    <div css={styleNftAsset}>
      <Image
        src={asset.image_url}
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