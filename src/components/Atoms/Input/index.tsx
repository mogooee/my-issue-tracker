/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import * as S from '@/components/Atoms/Input/index.styles';

export interface InputTypes {
  disabled?: boolean;
  inputSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  inputType: string;
  inputValue?: string;
  inputMaxLength: number;
  inputPlaceholder: string;
  isActive?: boolean;
  isTyping?: boolean;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultMaxLength = 20;

const Input = ({ disabled = false, inputMaxLength = defaultMaxLength, ...props }: InputTypes) => {
  const {
    isActive = false,
    isTyping = false,
    inputType,
    inputSize,
    inputValue,
    inputPlaceholder,
    onChange,
    onClick,
    onBlur,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClickForm = () => {
    if (!onClick || disabled) return;
    inputRef?.current?.focus();
    onClick();
  };

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange!(event);
    // eslint-disable-next-line no-param-reassign
    if (Number(value) >= inputMaxLength) event.target.value = value.slice(0, inputMaxLength);
  };

  return (
    <S.Form isActive={isActive} inputSize={inputSize} onClick={handleOnClickForm}>
      {isTyping && <label>{inputPlaceholder}</label>}
      <S.Input
        type={inputType}
        disabled={disabled}
        defaultValue={inputValue || ''}
        placeholder={inputPlaceholder}
        maxLength={inputMaxLength}
        ref={inputRef}
        onBlur={onBlur}
        onChange={handleOnChangeInput}
      />
    </S.Form>
  );
};
export default Input;
