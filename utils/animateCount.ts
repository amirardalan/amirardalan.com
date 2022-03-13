const animateCount = () => {

  const animationDuration = 1000
  const frameDuration = 500 / 60
  const totalFrames = Math.round( animationDuration / frameDuration )
  const easeOutQuad = t => t * ( 2 - t )

  const animateCountUp = el => {
    let frame = 0;
    const countTo = parseInt( el.innerHTML, 10 )
    const counter = setInterval( () => {
      frame++
      const progress = easeOutQuad( frame / totalFrames )
      const currentCount = Math.round( countTo * progress )

      if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
        el.innerHTML = currentCount
      }

      if ( frame === totalFrames ) {
        clearInterval( counter )
      }
    }, frameDuration )
  }

  const countupEls = document.querySelectorAll( '.countUp' )
  countupEls.forEach( animateCountUp )
}

export default animateCount