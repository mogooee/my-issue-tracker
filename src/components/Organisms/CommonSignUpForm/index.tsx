import { useRecoilValue } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';

import * as S from '@/components/Organisms/CommonSignUpForm/index.styles';
import Button from '@/components/Atoms/Button';
import SignUpInput from '@/components/Molecules/SignUpInput';

interface FormInfoTypes {
  id: string;
  inputType: string;
  maxLength: number;
  placeholder: string;
  pattern: RegExp;
  patternMsg: string;
  errMsg: string;
}

const CommonSignUpForm = ({ FORM_INFO }: { FORM_INFO: FormInfoTypes[] }) => {
  const signUpFormValue = useRecoilValue(SignUpFormState);
  const signUpFormErrorValue = useRecoilValue(SignUpFormErrorState);

  const isBlankForm = () => {
    let blank = false;

    Object.keys(signUpFormValue).forEach((key) => {
      const k = key as keyof typeof signUpFormValue;
      if (!signUpFormValue[k]) blank = true;
    });

    return blank;
  };

  const isError = () => {
    let error = false;

    signUpFormErrorValue.forEach((obj) => {
      if (obj.state) error = true;
    });

    return error;
  };

  const disabled = () => isError() || isBlankForm();

  return (
    <S.CommonSignUpForm>
      <h1>회원가입</h1>
      {FORM_INFO.map(({ ...props }) => {
        return <SignUpInput key={props.id} {...props} />;
      })}
      <Button buttonStyle="STANDARD" label="회원가입" size="LARGE" disabled={disabled()} />
    </S.CommonSignUpForm>
  );
};

export default CommonSignUpForm;
