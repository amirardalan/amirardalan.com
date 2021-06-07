import { useState } from 'react'
import { button, useControls } from 'leva'
import CanvasTerrain from '@/components/CanvasTerrain'
import { Global } from '@emotion/react'

const CanvasTerrainManager = ({ theme }) => {
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
          fontFamily: theme.fonts.primary,
          textTransform: 'uppercase',
          
          // Hide on Tablet/Mobile
          '@media(max-width: 890px)': {
            display: 'none',
          },

          'div:first-of-type': {
            backgroundColor: theme.colors.accent,
            boxShadow: 'none',
            animation: 'fadeIn 1s forwards',
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
            background: theme.colors.accent,
            svg: {
              fill: theme.colors.accentColor
            }
          },
          '.levabjb2y': {
            borderRadius: 0 + '!important',
          },
          button: {
            background: theme.colors.accentColor,
            letterSpacing: '.2rem',
            textTransform: 'uppercase',
            color: theme.colors.background,
          },
          '.levam9bkr.levaebmh1': {
            '&:hover': {
              color: 'unset'
            }
          },
          label: {
            '&:hover': {
              color: theme.colors.text
            },
            '+ div': {
              display: 'none'
            },
            svg: {
              background: theme.colors.accentColor
            }
          },
          '.levadtm57': {
            background: theme.colors.accentColor,
            boxShadow: 'none',
          },
          '.leva0sm9i, .levakncnr': {
            background: theme.colors.grayAccent + '!important'
          },
          '.levahlc9c': {
            background: theme.colors.grayAccent,
            color: theme.colors.text
          },
          '.leva5nscf': {
            color: theme.colors.grayscale
          },
          '.levadnk60 label': {
            background: theme.colors.grayAccent
          }
        }
      }} />
    </>
  )
}

export default CanvasTerrainManager