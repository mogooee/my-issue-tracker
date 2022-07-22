import { useRecoilState, useSetRecoilState } from 'recoil';
import { SignUpFormState, SignUpFormErrorState } from '@/components/Organisms/CommonSignUpForm';

import * as S from '@/components/Molecules/SignUpInput/index.styles';
import Input from '@/components/Atoms/Input';
import useInput from '@/hooks/useInput';

export interface SignUpInputTypes {
  id: string;
  inputType: string;
  maxLength: number;
  placeholder: string;
  pattern: RegExp;
  patternMsg: string;
}

const SignUpInput = ({ ...props }: SignUpInputTypes): JSX.Element => {
  const { id, inputType, maxLength, placeholder, pattern, patternMsg } = props;
  const { isError, setIsError, isActive, onChangeInput, onClickInput, onBlurInput } = useInput();

  const [signUpFormValue, setSignUpFormValue] = useRecoilState(SignUpFormState);
  const setSignUpForErrorValue = useSetRecoilState(SignUpFormErrorState);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const isError = id === 'passwordVerification' ? value !== signUpFormValue.password : !value.match(pattern);

    setIsError(isError);
    setSignUpForErrorValue(isError);
    setSignUpFormValue({ ...signUpFormValue, [id]: value });
    onChangeInput(event);
  };

  return (
    <S.SignUpInput isError={isError} id={placeholder}>
      <span>{placeholder}</span>
      <p className="caption">{patternMsg}</p>
      <Input
        isActive={isActive}
        inputMaxLength={maxLength}
        inputPlaceholder={placeholder}
        inputSize="MEDIUM"
        inputType={inputType}
        onClick={onClickInput}
        onChange={handleOnChange}
        onBlur={() => onBlurInput()}
      />
    </S.SignUpInput>
  );
};

export default SignUpInput;
