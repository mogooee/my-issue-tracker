/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import * as S from '@/components/Atoms/Input/index.styles';

export interface InputTypes {
  disabled?: boolean;
  inputSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  inputType: string;
  inputValue?: string;
  inputMaxLength: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  inputPlaceholder: string;
  isActive?: boolean;
  isTyping?: boolean;
  onClick: () => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
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
    inputRef,
    onChange,
    onClick,
    onBlur,
  } = props;

  useEffect(() => {}, [inputValue]);

  return (
    <S.Form
      isActive={isActive}
      inputSize={inputSize}
      onClick={() => {
        if (disabled) return;
        inputRef?.current?.focus();
        onClick();
      }}
    >
      {isTyping && <label>{inputPlaceholder}</label>}
      <S.Input
        type={inputType}
        disabled={disabled}
        defaultValue={inputValue || ''}
        placeholder={inputPlaceholder}
        maxLength={inputMaxLength}
        ref={inputRef}
        onBlur={onBlur}
        onChange={(event) => {
          const { value } = event.currentTarget;
          onChange(event);
          // eslint-disable-next-line no-param-reassign
          if (Number(value) >= inputMaxLength) event.currentTarget.value = value.slice(0, inputMaxLength);
        }}
      />
    </S.Form>
  );
};
export default Input;
