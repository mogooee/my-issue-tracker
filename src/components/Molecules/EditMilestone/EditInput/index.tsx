import React, { useEffect, useRef, useState } from 'react';

import * as S from '@/components/Molecules/EditMilestone/EditInput/index.styles';
import Input from '@/components/Atoms/Input';
import { MilestonesFormTypes } from '@/components/Molecules/EditMilestone/';

import useInput from '@/hooks/useInput';
import debounce from '@/utils/debounce';

export interface EditInputTypes {
  label: string;
  maxLength: number;
  placeholder: string;
  formKey: 'title' | 'description' | 'dueDate';
  value?: string;
}

interface EditInputStateTypes {
  state: MilestonesFormTypes;
  setState: React.Dispatch<React.SetStateAction<MilestonesFormTypes>>;
}

const EditInput = ({ ...props }: EditInputTypes & EditInputStateTypes) => {
  const { label, maxLength, placeholder, formKey, state, setState } = props;
  const { isActive, isTyping, onChangeInput, onClickInput, onBlurInput } = useInput();

  const timerId = useRef(0);
  const [isError, setIsError] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e);
    if (formKey === 'dueDate') {
      const reg = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
      const checkData = reg.test(e.target.value);
      setIsError(!checkData);
      return checkData && setState({ ...state, [formKey]: e.target.value });
    }
    setState({ ...state, [formKey]: e.target.value });
  };

  const handleOnTyping = debounce(timerId, handleOnChange, 300);

  return (
    <S.EditInput isError={isError}>
      <Input
        inputLabel={label}
        inputMaxLength={maxLength}
        inputPlaceholder={placeholder}
        inputSize="SMALL"
        inputType="text"
        inputValue={props.value}
        isActive={isActive}
        isTyping={isTyping}
        onBlur={onBlurInput}
        onChange={handleOnTyping}
        onClick={onClickInput}
      />
    </S.EditInput>
  );
};

export default EditInput;
