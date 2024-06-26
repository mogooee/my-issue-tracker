/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import * as S from '@/components/Atoms/Input/index.styles';

export interface InputTypes {
  disabled?: boolean;
  inputLabel?: string;
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
  onSubmit?: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

const defaultMaxLength = 100;

const Input = ({ disabled = false, inputMaxLength = defaultMaxLength, ...props }: InputTypes) => {
  const {
    isActive = false,
    isTyping = false,
    inputLabel,
    inputType,
    inputSize,
    inputValue,
    inputPlaceholder,
    onChange,
    onClick,
    onBlur,
    onSubmit,
  } = props;

  const [value, setValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue) {
      setValue(inputValue);
    }
  }, [inputValue]);

  const handleOnClickForm = () => {
    if (disabled) return;
    inputRef?.current?.focus();
    onClick?.();
  };

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: oldValue } = event.target;
    onChange?.(event);
    const newValue = Number(oldValue) >= inputMaxLength ? oldValue.slice(0, inputMaxLength) : oldValue;
    setValue(newValue);
  };

  const handleOnSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
    inputRef?.current?.blur();
  };

  return (
    <S.Form
      isActive={isActive}
      isTyping={isTyping}
      inputSize={inputSize}
      onClick={handleOnClickForm}
      onSubmit={handleOnSubmitForm}
    >
      {isTyping && <label>{inputLabel || inputPlaceholder}</label>}
      <S.Input
        type={inputType}
        disabled={disabled}
        value={value ?? ''}
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
