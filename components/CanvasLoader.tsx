import React from 'react'
import { Global, css, useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import CanvasTerrainControls from '@/components/CanvasTerrainControls'


const CanvasLoader =  React.memo(() => {
  const theme: any = useTheme()
  const styleLevaContainer = css({
    width: 'max-content',
    position: 'absolute',
    bottom: 5,
    right: 5,
    '@media(max-width: 890px)': {
      display: 'none'
    },
  })

  return (
    <>
      <Canvas
        css={{animation: 'slideUp 1s forwards'}}
        gl={{antialias: true}}
        dpr={window.devicePixelRatio}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.35, 0.35, 0.35] }}
      >
        <CanvasTerrainControls theme={theme} />
        <ambientLight />
      </Canvas>
      <div css={styleLevaContainer}>
        <Leva collapsed={false} fill={true} flat={true} />
      </div>
      <Global styles={{
        '.css-g7n1w2-styleLevaContainer, .css-1w8pts7': {
          fontFamily: 'var(--font-primary)',
          textTransform: 'uppercase',
          '--leva-colors-accent1': 'var(--color-accent-color)',
          '--leva-colors-accent2': 'var(--color-accent-color)',
          '--leva-colors-highlight3': 'var(--color-accent-color)',
          'div:first-of-type': {
            fontFamily: 'var(--font-primary)',
            backgroundColor: 'var(--color-accent)',
            boxShadow: 'none',
          },
          '.leva-c-gUBGce': {
            borderRadius: 'none !important',
            boxShadow: 'none !important'
          },
          '.levavqh1g > .levam9bkr:first-of-type, .levavqh1guk05a--isRoot-true > div:first-of-type': {
            marginTop: 5,
            paddingTop: 0,
          },
          '.levarv4c7': {
            display: 'none'
          },
          '.levaf42yt': {
            cursor: 'default',
          },
          '.levarv4c77egp0--drag-true:hover > svg': {
            fill: 'var(--color-accent-color)'
          },
          '.levawz9l9wdj1o--fill-false': {
            zIndex: 2,
            position: 'absolute',
            height: 'max-content',
            top: '1rem',
            bottom: '1rem',
            right: '1rem',
          },
          '.leva-c-fxiFTg': {
            backgroundColor: 'var(--color-accent-gray)',
            'input': {
              boxShadow: 'none'
            }
          },
          '.levam9bkr .levaolirc': {
            letterSpacing: '.1rem',
            textTransform: 'uppercase',
            color: 'var(--color-bg)',
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
              border: 'none',
              background: 'var(--color-accent-color)',
            },
            '&:focus': {
              boxShadow: '0 0 0 2px var(--color-gray)',
            }
          },
          '.leva-c-knrmXZ, .leva-c-bbMqub': {
            backgroundColor: 'var(--color-accent-gray) !important'
          },
          '.leva-c-ctBOWy > svg': {
            fill: 'var(--color-accent-color)',
            '&:hover': {
              fill: 'var(--color-accent-color)'
            }
          },
          '.leva-c-gUBGce:hover': {
            backgroundColor: 'var(--color-accent-color)'
          },
          '.leva-c-fOioiK': {
            boxShadow: 'none !important',
            letterSpacing: '.1rem',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            '&:active': {

              backgroundColor: 'var(--color-gray)'
            }
          },
          'i.levaussed, .levarv4c7': {
            background: 'var(--color-accent)',
            svg: {
              fill: 'var(--color-accent-color)',
              '&:hover': 'var(--color-accent-color)'
            },
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
            '&:hover': {
              background: 'var(--color-accent-color)',
            }
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
          '.levat4eko, .levat4eko::placeholder': {
            color: 'var(--color-text)',
          },
          '.leva2jitm': {
            background: 'var(--color-accent-gray)',
            input: {
              color: 'var(--color-text)',
              boxShadow: 'none'
            }
          },
          '.leva-c-kXfPOu': {
            backgroundColor: 'var(--color-accent-gray)',
            color: 'var(--color-text)',
            boxShadow: 'none'
          },
        }
      }} />
    </>
  )
})

export default CanvasLoader

