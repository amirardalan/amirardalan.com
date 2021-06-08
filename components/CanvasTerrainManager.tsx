import { useState } from 'react'
import { button, useControls } from 'leva'
import CanvasTerrain from '@/components/CanvasTerrain'
import { Global } from '@emotion/react'

const CanvasTerrainManager = () => {
  const [seed, setSeed] = useState(Date.now())

  const { resolution, height, levels, scale, rotate } = useControls({
    'Generate Terrain': button(() => setSeed(Date.now())),
    resolution: { value: 256, min: 10, max: 500, step: 1 },
    height: { value: .15, min: 0, max: .3 },
    levels: { value: 3, min: 1, max: 5, step: 1 },
    scale: { value: 3, min: 1, max: 5, step: 1 },
    rotate: { value: true }
  })

  return (
    <>
      <CanvasTerrain
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
          display: 'block',
          fontFamily: 'var(--font-primary)',
          textTransform: 'uppercase',
          
          // Hide on Tablet/Mobile
          '@media(max-width: 890px)': {
            display: 'none'
          },

          'div:first-of-type': {
            backgroundColor: 'var(--color-accent)',
            boxShadow: 'none',
            animation: 'fadeIn 1s forwards',
          },
          '.levavqh1g > .levam9bkr:first-of-type, .levavqh1guk05a--isRoot-true > div:first-of-type': {
            marginTop: 0,
            paddingTop: 0,
          },
          '.levawz9l9wdj1o--fill-false': {
            height: 'max-content',
            top: 'unset',
            bottom: '17%',
            right: '5.5rem',

            '@media(max-width: 1024px)': {
              bottom: '25%',
              right: '5rem'
            },

            '@media(max-width: 600px)': {
              bottom: '.5rem',
              right: '.5rem',
            }
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
            background: 'var(--color-gray-accent) !important'
          },
          '.levahlc9c': {
            background: 'var(--color-gray-accent)',
            color: 'var(--color-text)'
          },
          '.leva5nscf': {
            color: 'var(--color-gray)'
          },
          '.levadnk60 label': {
            background: 'var(--color-gray-accent)',
            svg: {
              stroke: 'var(--color-bg)',
            }
          }
        }
      }} />
    </>
  )
}

export default CanvasTerrainManager