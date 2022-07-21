import { useRef } from 'react';
import styled from 'styled-components';
import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import useInput from '@/hooks/useInput';

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
  const inputIdRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  return (
    <Form>
      <Input
        isActive={isIdActive}
        isTyping={isIdTyping}
        onChange={onChangeInputId}
        onClick={onClickInputId}
        onBlur={onBlurInputId}
        inputSize="LARGE"
        inputType="text"
        inputMaxLength={idMaxLength}
        inputPlaceholder="아이디"
        inputRef={inputIdRef}
      />
      <Input
        isActive={isPasswordActive}
        isTyping={isPasswordTyping}
        onChange={onChangeInputPassword}
        onClick={onClickInputPassword}
        onBlur={onBlurInputPassword}
        inputSize="LARGE"
        inputType="password"
        inputMaxLength={passwordMaxLength}
        inputPlaceholder="비밀번호"
        inputRef={inputPasswordRef}
      />
      <Button buttonStyle="STANDARD" label="아이디로 로그인" size="LARGE" />
    </Form>
  );
};

export default LoginForm;
