import React, { useState, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { FilterState, FilterStatsState, initFilterState } from '@/stores/filter';

import * as S from '@/components/Molecules/FilterBar/index.styles';

import Button from '@/components/Atoms/Button';
import Input, { InputTypes } from '@/components/Atoms/Input';
import Dropdown from '@/components/Molecules/Dropdown';

import useInput from '@/hooks/useInput';
import { FILTERBAR_CLEAR_BUTTON_PROPS } from '@/components/Molecules/FilterBar/mocks';
import { DropdownTypes, ListPanelTypes } from '@/components/Molecules/Dropdown/types';

export type FILTERBAR_INFO_TYPES = {
  DROPDOWN: DropdownTypes<ListPanelTypes>;
  INPUT: InputTypes;
};

const noReg = /^no/g;
const stateReg = /^is:/g;
const openQuery = 'is:open';
const closedQuery = 'is:closed';

const FilterBar = ({ ...props }: FILTERBAR_INFO_TYPES) => {
  const { DROPDOWN, INPUT } = props;

  const { filterBarState, isFiltering } = useRecoilValue(FilterStatsState);
  const setFilterState = useSetRecoilState(FilterState);
  const resetFilterValue = useResetRecoilState(FilterState);
  const { isActive, onClickInput, onBlurInput } = useInput();

  const [filterBarInputValue, setFilterBarInputValue] = useState<string>(filterBarState);

  const isChecked = (dataId: string) => {
    if (dataId.match(stateReg)) return filterBarState === dataId;
    return filterBarState === `${openQuery} ${dataId}`;
  };

  const filterIssues = (target: HTMLInputElement) => {
    const clickedPanelDataId = target.dataset.id!;
    const [key, value] = clickedPanelDataId!.split(':');

    setFilterState({ ...initFilterState, [key]: value });
  };

  const handleChangeFilterBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quries = event.target.value;
    if (!quries) return setFilterBarInputValue('');

    setFilterBarInputValue(quries);
  };

  const handleSubmitFilterBar = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetFilterValue();

    if (!filterBarInputValue.includes(openQuery) && !filterBarInputValue.includes(closedQuery))
      setFilterState((prev) => ({ ...prev, is: 'all' }));

    if (!filterBarInputValue) return;

    const quriesArr = filterBarInputValue.split(' ');
    quriesArr.forEach((qurey: string) => {
      const [key, value] = qurey.split(':');

      setFilterState((prev) => {
        if (key.match(noReg)) {
          const initState = value === 'label' ? [] : '';
          return { ...prev, no: [...prev.no, value as 'label' | 'assignee' | 'milestone'], [value]: initState };
        }

        const newValue = key === 'label' && Array.isArray(prev.label) ? [...prev.label, value] : value;
        const filterExsitedKey = prev.no.filter((e) => e !== key);
        return { ...prev, [key]: newValue, no: filterExsitedKey };
      });
    });
  };

  const DROPDOWN_PROPS = {
    ...DROPDOWN,
    panelProps: { ...DROPDOWN.panelProps, handleOnClick: filterIssues, isChecked },
  };

  useEffect(() => {
    setFilterBarInputValue(filterBarState);
  }, [filterBarState]);

  return (
    <S.FilterBarContainer>
      <S.FilterBar isActive={isActive}>
        <Dropdown {...DROPDOWN_PROPS} isActive={isActive} />
        <Input
          {...INPUT}
          inputValue={filterBarState}
          isActive={isActive}
          onClick={onClickInput}
          onBlur={onBlurInput}
          onChange={handleChangeFilterBar}
          onSubmit={handleSubmitFilterBar}
        />
      </S.FilterBar>
       {isFiltering && <Button {...FILTERBAR_CLEAR_BUTTON_PROPS} handleOnClick={resetFilterValue} />}
    </S.FilterBarContainer>
  );
};

export default FilterBar;
