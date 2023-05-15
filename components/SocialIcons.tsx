import { FC, Key } from 'react';
import Icon from '@/components/Icon';
import { SocialIconsTypes } from '@/types/icons';
import IconTwitter from '@/components/IconTwitter';
import IconGithub from '@/components/IconGithub';
import IconCodepen from '@/components/IconCodepen';
import IconLinkedin from '@/components/IconLinkedin';
import { gtagEvent } from '@/lib/gtag';

type SocialiconsProps = {
  about: object & SocialIconsTypes;
};

const SocialIcons: FC<SocialiconsProps> = ({ about }) => {
  const iconComponentMap: Record<string, any> = {
    Twitter: <IconTwitter size={48} />,
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
        <button key={i} onClick={handleSocialIconClick}>
          <a
            href={item.path}
            target="_blank"
            rel="noreferrer noopener"
            title={item.title}
            aria-label={item.title}
          >
            <Icon title={item.title} icon={iconComponent} />
          </a>
        </button>
      );
    });
  };

  return <>{about.social && GenerateSocialIcons(about.social.items)}</>;
};

export default SocialIcons;
