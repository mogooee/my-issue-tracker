import { useRecoilValue, useResetRecoilState } from 'recoil';
import * as S from '@/components/Molecules/FilterBar/index.styles';
import Button from '@/components/Atoms/Button';
import Dropdown from '@/components/Molecules/Dropdown';
import useInput from '@/hooks/useInput';
import { FILTERBAR_CLEAR_BUTTON_PROPS } from '@/components/Molecules/FilterBar/mocks';

export type FILTERBAR_INFO_TYPES = {
  DROPDOWN: DropdownTypes<ListPanelTypes>;
  INPUT: InputTypes;
};

const FilterBar = ({ ...props }: FILTERBAR_INFO_TYPES) => {
  const { DROPDOWN, INPUT } = props;
  const { isFiltering } = useRecoilValue(FilterStatsState);
  const resetFilterValue = useResetRecoilState(FilterState);
  const { isActive, onClickInput, onBlurInput } = useInput();
  const { DROPDOWN, INPUT } = props;

  return (
    <S.FilterBarContainer>
      <S.FilterBar isActive={isActive}>
        <Dropdown {...DROPDOWN} isActive={isActive} />
        <Input {...INPUT} inputValue={filterBarState} isActive={isActive} onClick={onClickInput} onBlur={onBlurInput} />
      </S.FilterBar>
       {isFiltering && <Button {...FILTERBAR_CLEAR_BUTTON_PROPS} handleOnClick={resetFilterValue} />}
    </S.FilterBarContainer>
  );
};

export default FilterBar;
