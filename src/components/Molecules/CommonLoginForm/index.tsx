/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signin, OAuthResponse } from '@/api/sign';
import useInput from '@/hooks/useInput';
import useLogin from '@/api/sign/useLogin';

import Button from '@/components/Atoms/Button';

import * as S from '@/components/Molecules/CommonLoginForm/index.styles';

const initLoginForm = { id: '', password: '' };
const [idMaxLength, passwordMaxLength] = [10, 10];

const LoginForm = (): JSX.Element => {
  const {
    isActive: isIdActive,
    isTyping: isIdTyping,
    onChangeInput: onChangeInputId,
    onBlurInput: onBlurInputId,
  } = useInput();
  const {
    isActive: isPasswordActive,
    isTyping: isPasswordTyping,
    onChangeInput: onChangeInputPassword,
    onBlurInput: onBlurInputPassword,
  } = useInput();

  const navigate = useNavigate();
  const { setSuccessLoginState, saveAuthLoginState } = useLogin();
  const [loginForm, setLoginForm] = useState(initLoginForm);
  const [isError, setIsError] = useState<boolean>(false);

  const login = async () => {
    try {
      const { memberResponse } = (await signin(loginForm)) as OAuthResponse;
      setSuccessLoginState();
      saveAuthLoginState(memberResponse);
      navigate('/issues');
    } catch (error) {
      setIsError(true);
    }
  };

  const isDisable = loginForm.id !== '' && loginForm.password !== '';

  const handleOnKeyDownEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (!isDisable) return;
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <S.LoginForm onKeyDown={handleOnKeyDownEnter}>
      <S.LoginLabel isActive={isIdActive} isTyping={isIdTyping}>
        {isIdTyping && '아이디'}
        <S.LoginInput
          type="text"
          placeholder="아이디"
          maxLength={idMaxLength}
          onBlur={onBlurInputId}
          onChange={(e) => {
            onChangeInputId(e);
            setLoginForm({ ...loginForm, id: e.target.value });
          }}
        />
      </S.LoginLabel>
      <S.LoginLabel isActive={isPasswordActive} isTyping={isPasswordTyping}>
        {isPasswordTyping && '비밀번호'}
        <S.LoginInput
          type="password"
          placeholder="비밀번호"
          maxLength={passwordMaxLength}
          onBlur={onBlurInputPassword}
          onChange={(e) => {
            onChangeInputPassword(e);
            setLoginForm({ ...loginForm, password: e.target.value });
          }}
        />
      </S.LoginLabel>
      {isError && (
        <S.FailMessage>
          아이디 또는 비밀번호를 잘못 입력했습니다.
          <br /> 입력하신 내용을 다시 확인해주세요.
        </S.FailMessage>
      )}
      <Button buttonStyle="STANDARD" label="아이디로 로그인" size="LARGE" handleOnClick={login} disabled={!isDisable} />
    </S.LoginForm>
  );
};

export default LoginForm;
