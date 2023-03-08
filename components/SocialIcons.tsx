import { type FC, Key } from 'react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';

type SocialiconsProps = {
  //TODO: Update to server components to this isn't needed
  about: any;
};

const SocialIcons: FC<SocialiconsProps> = ({ about }) => {
  const theme: any = useTheme();
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

  const GenerateSocialIcons: any = (items: Array<object>) => {
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
