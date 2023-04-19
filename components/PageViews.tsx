import type { FC } from 'react';
import usePageviewsCount from '@/hooks/usePageviews';
import formatNumberCount from '@/utils/formatNumberCount';

type PageViewsProps = {};

const PageViews: FC<PageViewsProps> = () => {
  const { pageviewsCount } = usePageviewsCount();

  const views = pageviewsCount ? pageviewsCount : 0;

  return <span>{`${formatNumberCount(Number(views))} views`}</span>;
};

export default PageViews;
