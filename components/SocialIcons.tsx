import { FC, Key } from 'react';
import Image from 'next/image';
import { useTheme, Theme } from '@emotion/react';
import { SocialIconsTypes } from '@/types/icons';

type SocialiconsProps = {
  about: object & SocialIconsTypes;
};

const SocialIcons: FC<SocialiconsProps> = ({ about }) => {
  const theme: Theme = useTheme();
  const isDarkTheme: boolean = theme.active === 'dark';

  const GenerateSocialIcons: Function = (
    items: Array<{
      path: string;
      title: string;
      target: string;
      rel: string;
      content: string;
      icon: {
        dark: string;
        light: string;
      };
    }>
  ) => {
    return items.map((item, i: Key) => {
      return (
        <a
          key={i}
          href={item.path}
          target="_blank"
          rel="noreferrer noopener"
          title={item.title}
          aria-label={item.title}
        >
          <Image
            src={isDarkTheme ? item.icon.dark : item.icon.light}
            height="48"
            width="48"
            alt={item.title}
            aria-label={item.title}
            priority
          />
        </a>
      );
    });
  };

  return <>{about.social && GenerateSocialIcons(about.social.items)}</>;
};

export default SocialIcons;
