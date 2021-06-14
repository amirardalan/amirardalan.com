import { useState, useEffect } from 'react'
import { button, useControls } from 'leva'
import CanvasTerrain from '@/components/CanvasTerrain'
import { Global } from '@emotion/react'

const CanvasTerrainControls = ({ theme, terrainControls }) => {
  const [seed, setSeed] = useState(Date.now())

  const { resolution, height, levels, scale, rotate } = useControls({
    'Generate Terrain': button(() => setSeed(Date.now())),
    resolution: { value: 256, min: 10, max: 500, step: 1 },
    height: { value: .15, min: 0, max: .3 },
    levels: { value: 3, min: 1, max: 5, step: 1 },
    scale: { value: 3, min: 1, max: 5, step: 1 },
    rotate: { value: true },
  })


  // useEffect(() => {
  //   const levaDomNodeRendered = document.getElementById('leva__root')
  //   if (levaDomNodeRendered) {
  //     document.getElementById('leva').appendChild(document.getElementById('leva__root'))
  //   }
  // }, [])

  return (
    <>
      <CanvasTerrain
        theme={theme}
        seed={seed}
        size={resolution}
        height={height}
        levels={levels}
        scale={scale}
        rotate={rotate}
      />
      <Global styles={{
        // Leva Controls Override
        '#leva__root': {
          display: terrainControls ? 'block' : 'none',
          fontFamily: 'var(--font-primary)',
          textTransform: 'uppercase',
          '--leva-colors-accent2': 'var(--color-accent-color)',
          
          // Hide on Tablet/Mobile
          '@media(max-width: 890px)': {
            display: 'none'
          },
          'div:first-of-type': {
            fontFamily: 'var(--font-primary)',
            backgroundColor: 'var(--color-accent)',
            boxShadow: 'none',
          },
          '.levavqh1g > .levam9bkr:first-of-type, .levavqh1guk05a--isRoot-true > div:first-of-type': {
            marginTop: 0,
            paddingTop: 0,
          },
          '.levawz9l9wdj1o--fill-false': {
            zIndex: 2,
            position: 'absolute',
            height: 'max-content',
            top: 'unset',
            bottom: '1rem',
            right: '1rem',
          },
          '.levaolirc': {
            boxShadow: 'none',
          },
          '.levaussed, .levarv4c7': {
            background: 'var(--color-accent)',
            svg: {
              fill: 'var(--color-accent-color)'
            },
          },
          '.levabjb2y': {
            borderRadius: 0 + '!important',
          },
          button: {
            background: 'var(--color-accent-color)',
            letterSpacing: '.2rem',
            textTransform: 'uppercase',
            color: 'var(--color-bg)',
          },
          '.levam9bkr.levaebmh1': {
            '&:hover': {
              color: 'unset'
            }
          },
          label: {
            '&:hover': {
              color: 'var(--color-text)'
            },
            '+ div': {
              display: 'none'
            },
            svg: {
              background: 'var(--color-accent-color)'
            }
          },
          '.levadtm57': {
            background: 'var(--color-accent-color)',
            boxShadow: 'none',
          },
          '.leva0sm9i, .levakncnr': {
            background: 'var(--color-accent-gray) !important'
          },
          '.levahlc9c': {
            background: 'var(--color-accent-gray)',
            color: 'var(--color-text)'
          },
          '.leva5nscf': {
            color: 'var(--color-gray)'
          },
          '.levadnk60 label': {
            background: 'var(--color-accent-gray)',
            svg: {
              stroke: 'var(--color-bg)',
            }
          },
          '.levat4eko': {
            color: 'var(--color-text)',
          },
        }
      }} />
    </>
  )
}

export default CanvasTerrainControls