import * as icons from '@/components/Atoms/Icon/svgs';
import { COLORS } from '@/styles/theme';

export type IconType = keyof typeof icons;

interface IconTypes {
  icon: IconType;
  stroke?: string;
  fill?: string;
}

const DEFAULT_COLOR = COLORS.TITLE_ACTIVE;

const Icon = ({ icon, stroke = DEFAULT_COLOR, fill = 'none' }: IconTypes) => {
  const SVGIcon = icons[icon];
  return <SVGIcon stroke={stroke} fill={fill} />;
};

export default Icon;
