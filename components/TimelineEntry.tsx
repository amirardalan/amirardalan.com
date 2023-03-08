import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

type TimelineEntryProps = {
  cName: string;
  title: string;
  content: string;
};

const TimelineEntry: FC<TimelineEntryProps> = (props) => {
  const { cName, title, content } = props;

  const { ref, inView } = useInView({
    rootMargin: '60% 0% -60% 0%',
  });

  return (
    <div ref={ref} className={inView ? 'timeline active' : 'timeline'}>
      <div
        className={inView ? 'scrollHighlight active' : 'scrollHighlight'}
      ></div>
      <div className={cName}>
        <h3>{title}</h3>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default TimelineEntry;
