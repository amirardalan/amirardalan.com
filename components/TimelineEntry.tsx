import { useInView } from 'react-intersection-observer'


const TimelineEntry = (props: any) => {
  const { cName, title, content, reset } = props
  
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: reset
  })

  return (
    <div ref={ref} className={inView ? 'timeline active' : 'timeline'}>
      <div className={cName}>
        <h4>{title}</h4>
        <span>{content}</span>
      </div>
    </div>
  )
}

export default TimelineEntry
