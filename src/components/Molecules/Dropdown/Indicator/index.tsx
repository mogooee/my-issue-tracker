import { DropdownIndicatorTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/Indicator/index.styles';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

const DropdownIndicator = ({ ...props }: DropdownIndicatorTypes) => {
  const { indicatorStyle, indicatorLabel, isActive } = props;
  return (
    <S.Indicator role="button" indicatorStyle={indicatorStyle} isActive={isActive}>
      <span>{indicatorLabel}</span>
      <Icon icon="Caret" stroke={COLORS.LABEL} />
    </S.Indicator>
  );
};

export default DropdownIndicator;
