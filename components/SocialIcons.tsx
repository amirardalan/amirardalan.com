import { FC, Key } from 'react';
import IconX from '@/components/IconX';
import Tooltip from '@/components/Tooltip';
import IconGithub from '@/components/IconGithub';
import IconCodepen from '@/components/IconCodepen';
import IconLinkedin from '@/components/IconLinkedin';
import { gtagEvent } from '@/lib/gtag';

import { SocialIconsTypes } from '@/types/icons';

type SocialiconsProps = {
  about: object & SocialIconsTypes;
};

const SocialIcons: FC<SocialiconsProps> = ({ about }) => {
  const iconComponentMap: Record<string, any> = {
    X: <IconX size={48} />,
    GitHub: <IconGithub size={48} />,
    CodePen: <IconCodepen size={48} />,
    LinkedIn: <IconLinkedin size={48} />,
  };

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
    const handleSocialIconClick = () => {
      gtagEvent({
        action: 'click',
        category: 'external_link',
        label: `Click Social Icon`,
      });
    };

    return items.map((item, i: Key) => {
      const iconComponent = iconComponentMap[item.title];
      return (
        <Tooltip key={i} pos="b" text={item.title}>
          <button onClick={handleSocialIconClick}>
            <a
              href={item.path}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={item.title}
            >
              <div>{iconComponent}</div>
            </a>
          </button>
        </Tooltip>
      );
    });
  };

  return <>{about.social && GenerateSocialIcons(about.social.items)}</>;
};

export default SocialIcons;
