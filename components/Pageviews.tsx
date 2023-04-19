import type { FC } from 'react';
import usePageviews from '@/hooks/usePageviews';
import formatNumber from '@/utils/formatNumber';

type PageviewsProps = {};

const Pageviews: FC<PageviewsProps> = () => {
  const { pageviews } = usePageviews();

  const views = pageviews ? pageviews : 0;

  return <span>{`${formatNumber(Number(views))} views`}</span>;
};

export default Pageviews;
