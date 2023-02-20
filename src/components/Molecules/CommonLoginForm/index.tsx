import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signin, OAuthResponse } from '@/api/sign';
import useInput from '@/hooks/useInput';
import useLogin from '@/api/sign/useLogin';

import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';

import * as S from '@/components/Molecules/CommonLoginForm/index.styles';

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

  return (
    <S.LoginForm>
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
        <S.FailMessage>
          아이디 또는 비밀번호를 잘못 입력했습니다.
          <br /> 입력하신 내용을 다시 확인해주세요.
        </S.FailMessage>
      )}
      <Button buttonStyle="STANDARD" label="아이디로 로그인" size="LARGE" handleOnClick={login} />
    </S.LoginForm>
  );
};

export default LoginForm;
