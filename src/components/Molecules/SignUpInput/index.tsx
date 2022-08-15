import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormSelector } from '@/stores/signUp';

import * as S from '@/components/Molecules/SignUpInput/index.styles';
import Input from '@/components/Atoms/Input';
import useInput from '@/hooks/useInput';
import { getDuplicatesResult } from '@/api/signUp';

export interface SignUpInputTypes {
  id: string;
  inputType: string;
  maxLength: number;
  placeholder: string;
  pattern: RegExp;
  patternMsg: string;
  errMsg: string;
}

const SignUpInput = ({ ...props }: SignUpInputTypes): JSX.Element => {
  const { id, inputType, maxLength, placeholder, pattern, patternMsg, errMsg } = props;
  const { isActive, onChangeInput, onClickInput, onBlurInput } = useInput();

  const [signUpFormValue, setSignUpFormValue] = useRecoilState(SignUpFormSelector);
  const [signUpFormErrorValue, setSignUpFormErrorValue] = useRecoilState(SignUpFormErrorState);

  const formError = signUpFormErrorValue.find((el) => el.id === id);

  const timerId = useRef(0);

  const debounce =
    (callback: any, delay: number = 2000) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(
        () => {
          callback(event);
        },
        delay,
        event,
      );
    };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isError = id === 'passwordVerification' ? value !== signUpFormValue.password : !value.match(pattern);

    const changedErrorValue = signUpFormErrorValue.map((e) => (e.id === id ? { ...e, state: isError, errMsg } : e));

    setSignUpFormErrorValue(changedErrorValue);
    setSignUpFormValue({ [id]: value });
    onChangeInput(event);
  };

  const checkDuplicates = async (value: string) => {
    if (id !== 'id' && id !== 'email' && id !== 'nickname') return;
    if (formError!.state) return;
    const router = id === 'id' ? 'login-id' : id;

    const data = await getDuplicatesResult(router, value);

    if (data === true) {
      const map = signUpFormErrorValue.map((e) =>
        e.id === id ? { ...e, state: data, errMsg: `중복되는 ${placeholder} 입니다.` } : e,
      );

      setSignUpFormErrorValue(map);
    }
  };

  const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    onBlurInput();

    if (event.target.value === '') return;
    checkDuplicates(event.target.value);
  };

  const handleOnTyping = debounce(handleOnChange, 300);

  return (
    <S.SignUpInput isError={formError}>
      <span>{placeholder}</span>
      <p className="caption">{patternMsg}</p>
      <Input
        isActive={isActive}
        inputMaxLength={maxLength}
        inputPlaceholder={placeholder}
        inputSize="MEDIUM"
        inputType={inputType}
        onClick={onClickInput}
        onChange={handleOnTyping}
        onBlur={handleOnBlur}
      />
    </S.SignUpInput>
  );
};

export default SignUpInput;
