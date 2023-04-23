import { ReactElement, type FC } from 'react';

type IconProps = {
  title: string;
  icon: ReactElement;
};

const Icon: FC<IconProps> = ({ title, icon }) => {
  return <div title={title}>{icon}</div>;
};

export default Icon;
