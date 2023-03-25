import { FC, Key } from 'react';
import Image from 'next/image';
import { useTheme, Theme } from '@emotion/react';

type SocialiconsProps = {
  about: object & {
    social?: object & {
      items?: string;
    };
  };
};

const SocialIcons: FC<SocialiconsProps> = ({ about }) => {
  const theme: Theme = useTheme();
  const isDarkTheme: boolean = theme.active === 'dark';

  interface Item {
    path: string;
    title: string;
    target: string;
    rel: string;
    content: string;
    icon: {
      dark: string;
      light: string;
    };
  }

  const GenerateSocialIcons: Function = (items: Array<object>) => {
    return items.map((item: Item, i: Key) => {
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

  return <>{GenerateSocialIcons(about.social.items)}</>;
};

export default SocialIcons;
