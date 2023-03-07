import { type FC, Key } from 'react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';

type SocialiconsProps = {
  about: {
    social: {
      items: Array<object>;
    };
  };
  content: string;
};

const SocialIcons: FC<SocialiconsProps> = ({ about }) => {
  const theme: any = useTheme();
  const isDarkTheme = theme.active === 'dark';

  const GenerateSocialIcons = (items: any[]) => {
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

  return <>{GenerateSocialIcons(about.social.items)}</>;
};

export default SocialIcons;
