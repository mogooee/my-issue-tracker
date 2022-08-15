import { DropdownTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/index.styles';
import DropdownIndicator from '@/components/Molecules/Dropdown/Indicator';
import DropdownPanel from '@/components/Molecules/Dropdown/Panel';

const Dropdown = ({ ...props }: DropdownTypes) => {
  const { indicatorLabel, indicatorStyle, isActive, ...panelProps } = props;

  return (
    <S.Dropdown dropdownStyle={indicatorStyle}>
      <DropdownIndicator indicatorLabel={indicatorLabel} indicatorStyle={indicatorStyle} isActive={isActive} />
      <DropdownPanel {...panelProps} />
    </S.Dropdown>
  );
};

export default Dropdown;
