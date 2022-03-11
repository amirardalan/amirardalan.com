import { useInView } from 'react-intersection-observer'
interface TimelineProps {
  cName: string
  title: string,
  content: string
}

const TimelineEntry = (props: TimelineProps) => {
  const { cName, title, content } = props
  
  const { ref, inView } = useInView({
    rootMargin: '80% 0% -80% 0%',
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
