import { useInView } from 'react-intersection-observer'


const TimelineEntry = (props: any) => {
  const { cName, title, content } = props
  
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
    rootMargin: '60% 0px -40% 0px'
  })

  return (
    <div ref={ref} className={inView ? 'timeline active' : 'timeline'}>
      <div className={inView ? 'scrollHighlight active' : 'scrollHighlight'}>
      </div>
      <div className={cName}>
        <h4>{title}</h4>
        <span>{content}</span>
      </div>
    </div>
  )
}

export default TimelineEntry
