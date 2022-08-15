import { DropdownTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/FilterBar/index.styles';
import Dropdown from '@/components/Molecules/Dropdown';
import useInput from '@/hooks/useInput';

export type FILTERBAR_INFO_TYPES = {
  DROPDOWN: DropdownTypes;
  INPUT: {
    placeholder: string;
    defaultValue: string;
  };
};

const FilterBar = ({ ...props }: FILTERBAR_INFO_TYPES) => {
  const { isActive, onClickInput, onBlurInput } = useInput();
  const { DROPDOWN, INPUT } = props;

  return (
    <S.FilterBar>
      <Dropdown {...DROPDOWN} isActive={isActive} />
      <S.FilterBarInput type="text" {...INPUT} isActive={isActive} onClick={onClickInput} onBlur={onBlurInput} />
    </S.FilterBar>
  );
};

export default FilterBar;
