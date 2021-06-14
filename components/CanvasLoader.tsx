import React, { useState, useEffect } from 'react'
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
        css={{ animation: 'slideUp 1s forwards' }}
        gl={{ antialias: true }}
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
        // Leva Controls Override
        '.levawz9l9': {
          fontFamily: 'var(--font-primary)',
          textTransform: 'uppercase',
          '--leva-colors-accent2': 'var(--color-accent-color)',
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
            top: '1rem',
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
})

export default CanvasLoader

