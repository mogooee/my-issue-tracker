import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Atoms/CheckBox/index.styles';

import { IssueTableCheckState } from '@/stores/checkBox';
import useCheckBox from '@/hooks/useCheckBox';

export interface CheckboxTypes {
  id: number;
  checked?: boolean;
  type?: 'parent' | 'child';
}

const CheckBox = ({ id, type, checked = false }: CheckboxTypes) => {
  const { checkStatsState } = useRecoilValue(IssueTableCheckState);
  const { clickParentCheckBox, clickChildCheckBox } = useCheckBox();

  const inputRef = useRef<HTMLInputElement>(null);

  if (type === 'parent' && inputRef?.current) {
    inputRef.current.indeterminate = checkStatsState === 'some' ? true : false;
  }

  const onChangeCheckbox = (event: { target: HTMLInputElement }) => {
    if (type === 'parent') {
      clickParentCheckBox(event.target.checked);
    } else {
      clickChildCheckBox(id, event.target.checked);
    }
  };

  return (
    <S.CheckBox className="checkbox">
      <input type="checkbox" id={`checkbox-${id}`} checked={checked} onChange={onChangeCheckbox} ref={inputRef} />
      <label htmlFor={`checkbox-${id}`} />
    </S.CheckBox>
  );
};

export default CheckBox;
