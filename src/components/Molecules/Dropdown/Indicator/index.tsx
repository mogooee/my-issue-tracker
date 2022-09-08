import { DropdownIndicatorTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/Indicator/index.styles';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

const DropdownIndicator = ({ ...props }: DropdownIndicatorTypes) => {
  const { indicatorStyle, indicatorLabel, indicatorIcon, isActive } = props;
  return (
    <S.Indicator role="button" indicatorStyle={indicatorStyle} isActive={isActive}>
      {indicatorLabel && <span>{indicatorLabel}</span>}
      {indicatorIcon}
      {indicatorStyle !== 'ICON' && (
        <Icon icon={indicatorStyle === 'SIDEBAR' ? 'Plus' : 'Caret'} stroke={COLORS.LABEL} />
      )}
    </S.Indicator>
  );
};

export default DropdownIndicator;
