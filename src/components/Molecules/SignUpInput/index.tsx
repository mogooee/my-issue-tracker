import { useRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';

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
  errMsg: string;
}

const SignUpInput = ({ ...props }: SignUpInputTypes): JSX.Element => {
  const { id, inputType, maxLength, placeholder, pattern, patternMsg, errMsg } = props;
  const { isActive, onChangeInput, onClickInput, onBlurInput } = useInput();

  const [signUpFormValue, setSignUpFormValue] = useRecoilState(SignUpFormState);
  const [signUpFormErrorValue, setSignUpFormErrorValue] = useRecoilState(SignUpFormErrorState);

  const formError = signUpFormErrorValue.find((el) => el.id === id);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const isError = id === 'passwordVerification' ? value !== signUpFormValue.password : !value.match(pattern);

    const changedErrorValue = signUpFormErrorValue.map((e) => {
      return e.id === id ? { ...e, state: isError, errMsg } : e;
    });

    setSignUpFormErrorValue(changedErrorValue);
    setSignUpFormValue({ ...signUpFormValue, [id]: value });
    onChangeInput(event);
  };

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
        onChange={handleOnChange}
        onBlur={() => onBlurInput()}
      />
    </S.SignUpInput>
  );
};

export default SignUpInput;
