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

const FailMessage = styled.span`
  color: ${({ theme }) => theme.COLORS.ERROR.RED};
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  display: block;
  text-align: center;
  padding-bottom: 24px;
`;

const initLoginForm = { id: '', password: '' };
const [idMaxLength, passwordMaxLength] = [10, 10];

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

  const navigate = useNavigate();
  const { saveAuthLoginState } = useLogin();
  const [loginForm, setLoginForm] = useState(initLoginForm);
  const [isError, setIsError] = useState<boolean>(false);

  const login = async () => {
    try {
      const { memberResponse } = (await generalLogin(loginForm)) as OAuthResponse;
      saveAuthLoginState(memberResponse);
      navigate('/issues');
    } catch (error) {
      setIsError(true);
    }
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
      {isError && (
        <FailMessage>
          아이디 또는 비밀번호를 잘못 입력했습니다.
          <br /> 입력하신 내용을 다시 확인해주세요.
        </FailMessage>
      )}
      <Button buttonStyle="STANDARD" label="아이디로 로그인" size="LARGE" handleOnClick={login} />
    </Form>
  );
};

export default LoginForm;
