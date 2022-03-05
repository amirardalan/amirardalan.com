import { useInView } from 'react-intersection-observer'


const TimelineEntry = (props: any) => {
  const { cName, title, content } = props
  
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: '60% 0% -40% 0%',
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
