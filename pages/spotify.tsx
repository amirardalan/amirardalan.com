import { css } from '@emotion/react'
import { spotify } from '@/data/content'
import NowPlaying from '@/components/NowPlaying'
import TopTracks from '@/components/TopTracks'
import Head from 'next/head'


export default function Spotify() {

  const styleSpotifyContainer = css({
    h3: {
      margin: '4rem 0 2rem 0',
      fontSize: 28,
      fontWeight: 'bold',
      '@media (max-width: 1024px)': {
        margin: '2rem 0 1rem 0',
        fontSize: 22,
      }
    }
  })

  return (
    <div className="container spotify">
      <Head>
        <title>{spotify.meta.title}</title>
      </Head>
      <div className="spotify" css={styleSpotifyContainer}>
        <h2 className="pageHeading">
          {spotify.headings.main}
        </h2>
        <NowPlaying />
        <h3 id="top-tracks">
          {spotify.headings.toptracks}
        </h3>
        <TopTracks />
      </div>
    </div>
  )
}