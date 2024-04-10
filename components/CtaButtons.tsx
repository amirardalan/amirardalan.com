import { FC } from 'react';
import Link from 'next/link';
import { CtaButtonsTypes } from '@/types/button';

type CtaButtonsProps = {
  items: CtaButtonsTypes['items'];
};

const CtaButtons: FC<CtaButtonsProps> = ({ items }) => {
  return (
    <>
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.path}
          aria-label={item.title}
          className={`ctaButton ${item.icon ? `${item.icon} ` : ''}${
            item.style === 'reverse' ? 'reverse' : ''
          }`}
          target={item.target}
          rel={item.rel}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
};

export default CtaButtons;
