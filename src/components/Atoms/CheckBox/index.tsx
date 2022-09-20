import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Atoms/CheckBox/index.styles';

import useCheckBox from '@/hooks/useCheckBox';
import { CheckState, DefaultCheckIds } from '@/stores/checkBox';

export interface CheckboxTypes {
  id: number;
  checked?: boolean;
  type?: 'parent' | 'child';
}

const CheckBox = ({ id, type, checked = false }: CheckboxTypes) => {
  const checkState = useRecoilValue(CheckState);
  const defaultCheckIds = useRecoilValue(DefaultCheckIds);
  const { clickParentCheckBox, clickChildCheckBox } = useCheckBox();

  const inputRef = useRef<HTMLInputElement>(null);

  if (type === 'parent' && inputRef?.current) {
    const totalChildBoxNum = defaultCheckIds.length;
    inputRef.current.indeterminate = checkState.child.length > 0 && checkState.child.length < totalChildBoxNum;
  }

  const onChangeCheckbox = () => {
    if (type === 'parent') {
      clickParentCheckBox();
    } else {
      clickChildCheckBox(id);
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
