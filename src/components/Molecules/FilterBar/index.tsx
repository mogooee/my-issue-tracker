import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { FilterState, FilterStatsState } from '@/stores/filter';

import * as S from '@/components/Molecules/FilterBar/index.styles';

import Button from '@/components/Atoms/Button';
import Input, { InputTypes } from '@/components/Atoms/Input';
import Dropdown from '@/components/Molecules/Dropdown';

import useInput from '@/hooks/useInput';
import { FILTERBAR_CLEAR_BUTTON_PROPS } from '@/components/Molecules/FilterBar/mocks';
import { DropdownTypes, ListPanelTypes } from '@/components/Molecules/Dropdown/types';
import useFilter, { parsingFilterReg, stateFilterReg } from '@/hooks/useFilter';
import debounce from '@/utils/debounce';

export type FILTERBAR_INFO_TYPES = {
  DROPDOWN: (
    handleOnClick: (target: HTMLInputElement) => void,
    isChecked: (dataId: string) => boolean,
  ) => DropdownTypes<ListPanelTypes>;
  INPUT: InputTypes;
};

const DELAY = 100;

const FilterBar = ({ ...props }: FILTERBAR_INFO_TYPES) => {
  const { DROPDOWN, INPUT } = props;

  const timerId = useRef<number>(0);
  const { filterBarString, isFiltering } = useRecoilValue(FilterStatsState);
  const setFilterState = useSetRecoilState(FilterState);
  const resetFilterValue = useResetRecoilState(FilterState);
  const { isActive, onClickInput, onBlurInput } = useInput();

  const [filterBarInputValue, setFilterBarInputValue] = useState<string>(filterBarString);
  const { setIssueState, setParsingFilterState } = useFilter();

  const isChecked = (dataId: string) => {
    if (dataId.match(stateFilterReg)) return filterBarString === dataId;
    return filterBarString === `is:open ${dataId}`;
  };

  const filterIssues = (target: HTMLInputElement) => {
    const clickedPanelDataId = target.dataset.id!;
    resetFilterValue();
    setParsingFilterState(clickedPanelDataId!);
  };

  const handleChangeFilterBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queries = event.target.value;
    if (!queries) return setFilterBarInputValue('');

    setFilterBarInputValue(queries);
  };

  const handleTypingFilterBar = debounce(timerId, handleChangeFilterBar, DELAY);

  const handleSubmitFilterBar = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetFilterValue();

    if (!filterBarInputValue) {
      setFilterState((prev) => ({ ...prev, is: 'all' }));
      return;
    }

    setIssueState(filterBarInputValue);

    const queriesArr = filterBarInputValue.match(parsingFilterReg);
    queriesArr?.forEach((query: string) => {
      setParsingFilterState(query);
    });
  };

  useEffect(() => {
    setFilterBarInputValue(filterBarString);
  }, [filterBarString]);

  return (
    <S.FilterBarContainer>
      <S.FilterBar isActive={isActive}>
        <Dropdown {...DROPDOWN(filterIssues, isChecked)} isActive={isActive} />
        <Input
          {...INPUT}
          inputValue={filterBarString}
          isActive={isActive}
          onClick={onClickInput}
          onBlur={onBlurInput}
          onChange={handleTypingFilterBar}
          onSubmit={handleSubmitFilterBar}
        />
      </S.FilterBar>
      {isFiltering && <Button {...FILTERBAR_CLEAR_BUTTON_PROPS} handleOnClick={resetFilterValue} />}
    </S.FilterBarContainer>
  );
};

export default FilterBar;
