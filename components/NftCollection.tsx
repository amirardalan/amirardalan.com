import NftAsset from '@/components/NftAsset'


export default function NftCollection({ data }) {

  if (!data) {
    return null
  }

  return data.map((asset: any) => (
    <NftAsset key={asset.created_date} {...asset} />
  ))
}