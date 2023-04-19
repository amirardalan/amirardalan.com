import type { FC } from 'react';
import usePageviews from '@/hooks/usePageviews';
import formatNumber from '@/utils/formatNumber';

type PageViewsProps = {};

const PageViews: FC<PageViewsProps> = () => {
  const { pageviews } = usePageviews();

  const views = pageviews ? pageviews : 0;

  return <span>{`${formatNumber(Number(views))} views`}</span>;
};

export default PageViews;
