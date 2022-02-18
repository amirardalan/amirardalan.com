import { about } from '@/data/content'
import { GenerateCtaButtons } from '@/components/CtaButtons'

export default function SocialIcons() {

  return (
    <>
      {GenerateCtaButtons(about.bio.items)}
    </>
  )
}