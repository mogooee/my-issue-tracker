import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Molecules/FilterBar/index.styles';

import Button from '@/components/Atoms/Button';
import Input, { InputTypes } from '@/components/Atoms/Input';
import Dropdown from '@/components/Molecules/Dropdown';

import useInput from '@/hooks/useInput';
import { FILTERBAR_CLEAR_BUTTON_PROPS } from '@/components/Molecules/FilterBar/mocks';
import { DropdownTypes, ListPanelTypes } from '@/components/Molecules/Dropdown/types';
import useFilter, { OPEN_QUERY } from '@/hooks/useFilter';
import debounce from '@/utils/debounce';
import { FilterState, FilterStatsState } from '@/stores/filter';

export type FILTERBAR_INFO_TYPES = {
  DROPDOWN: (
    handleOnClick: (target: HTMLInputElement) => void,
    isChecked: (dataId: string) => boolean,
  ) => DropdownTypes<ListPanelTypes>;
  INPUT: InputTypes;
};

const DELAY = 50;

const FilterBar = ({ ...props }: FILTERBAR_INFO_TYPES) => {
  const { DROPDOWN, INPUT } = props;

  const timerId = useRef<number>(0);
  const queries = useRecoilValue(FilterState);
  const { isFiltering } = useRecoilValue(FilterStatsState);

  const [filterBarValue, setFilterBarValue] = useState<string>(queries);
  const { isActive, onClickInput, onBlurInput } = useInput();
  const { searchFilter } = useFilter();
  const meReg = /\w+:@me$/;

  const isChecked = (dataId: string): boolean => {
    if (meReg.test(dataId)) {
      return queries === `${OPEN_QUERY} ${dataId}`;
    }

    return queries === dataId;
  };

  const filterIssues = (target: HTMLInputElement) => {
    const dataId = target.dataset.id!;

    if (meReg.test(dataId)) {
      searchFilter(`${OPEN_QUERY} ${dataId}`);
      return;
    }

    searchFilter(dataId);
  };

  const handleChangeFilterBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queriesValue = event.target.value;
    if (!queriesValue) return setFilterBarValue('');

    setFilterBarValue(queriesValue);
  };

  const handleTypingFilterBar = debounce(timerId, handleChangeFilterBar, DELAY);

  const handleSubmitFilterBar = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchFilter(filterBarValue);
  };

  return (
    <S.FilterBarContainer>
      <S.FilterBar isActive={isActive}>
        <Dropdown {...DROPDOWN(filterIssues, isChecked)} isActive={isActive} />
        <Input
          {...INPUT}
          inputValue={queries}
          isActive={isActive}
          onClick={onClickInput}
          onBlur={onBlurInput}
          onChange={handleTypingFilterBar}
          onSubmit={handleSubmitFilterBar}
        />
      </S.FilterBar>
      {isFiltering && (
        <Link to="/issues">
          <Button {...FILTERBAR_CLEAR_BUTTON_PROPS} />
        </Link>
      )}
    </S.FilterBarContainer>
  );
};

export default FilterBar;
