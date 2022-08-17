import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { generalLogin } from '@/api/login_logout';
import { OAuthResponse } from '@/api/signUp';
import useInput from '@/hooks/useInput';
import useLogin from '@/hooks/useLogin';

import styled from 'styled-components';
import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';

const Form = styled.div`
  form + form {
    margin: 16px 0 24px 0;
  }
`;

const LoginForm = (): JSX.Element => {
  const {
    isActive: isIdActive,
    isTyping: isIdTyping,
    onChangeInput: onChangeInputId,
    onClickInput: onClickInputId,
    onBlurInput: onBlurInputId,
  } = useInput();
  const {
    isActive: isPasswordActive,
    isTyping: isPasswordTyping,
    onChangeInput: onChangeInputPassword,
    onClickInput: onClickInputPassword,
    onBlurInput: onBlurInputPassword,
  } = useInput();

  const [idMaxLength, passwordMaxLength] = [10, 10];

  const navigate = useNavigate();
  const { onSuccessLogin } = useLogin();

  const initLoginForm = { id: '', password: '' };
  const [loginForm, setLoginForm] = useState(initLoginForm);

  const login = async () => {
    const { memberResponse } = (await generalLogin(loginForm)) as OAuthResponse;
    onSuccessLogin(memberResponse);
    navigate('/issues');
  };

  return (
    <Form>
      <Input
        isActive={isIdActive}
        isTyping={isIdTyping}
        onChange={(e) => {
          onChangeInputId(e);
          setLoginForm({ ...loginForm, id: e.target.value });
        }}
        onClick={onClickInputId}
        onBlur={onBlurInputId}
        inputSize="LARGE"
        inputType="text"
        inputMaxLength={idMaxLength}
        inputPlaceholder="아이디"
      />
      <Input
        isActive={isPasswordActive}
        isTyping={isPasswordTyping}
        onChange={(e) => {
          onChangeInputPassword(e);
          setLoginForm({ ...loginForm, password: e.target.value });
        }}
        onClick={onClickInputPassword}
        onBlur={onBlurInputPassword}
        inputSize="LARGE"
        inputType="password"
        inputMaxLength={passwordMaxLength}
        inputPlaceholder="비밀번호"
      />
      <Button buttonStyle="STANDARD" label="아이디로 로그인" size="LARGE" handleOnClick={login} />
    </Form>
  );
};

export default LoginForm;
