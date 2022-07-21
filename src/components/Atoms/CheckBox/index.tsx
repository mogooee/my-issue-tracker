/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as S from '@/components/Atoms/CheckBox/index.styles';

export interface CheckboxTypes {
  id: number | 'ALL';
  checkedIssue: string[];
  checkedItemHandler: (id: string, isChecked: boolean) => void;
}

const CheckBox = ({ id, checkedItemHandler, checkedIssue }: CheckboxTypes) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    checkedItemHandler(String(id), e.target.checked);
  };

  return (
    <S.CheckBox className="checkbox" checkedIssue={checkedIssue} data-id={id}>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        data-id={id}
        onChange={onChangeCheckbox}
        checked={checkedIssue.includes(String(id))}
      />
      <label htmlFor={`checkbox-${id}`} />
    </S.CheckBox>
  );
};

export default CheckBox;
