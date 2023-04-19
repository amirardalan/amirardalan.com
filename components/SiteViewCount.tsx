import type { FC } from 'react';
import usePageViewCount from '@/hooks/usePageViewCount';
import formatNumber from '@/utils/formatNumber';

type SiteViewCountProps = {};

const SiteViewCount: FC<SiteViewCountProps> = () => {
  const { pageviews } = usePageViewCount();

  const views = pageviews ? pageviews : 0;

  return <span>{`${formatNumber(Number(views))} views`}</span>;
};

export default SiteViewCount;
