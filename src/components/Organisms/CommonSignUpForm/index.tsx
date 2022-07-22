import { atom, useRecoilValue } from 'recoil';
import * as S from '@/components/Organisms/CommonSignUpForm/index.styles';
import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import Button from '@/components/Atoms/Button';
import SignUpInput from '@/components/Molecules/SignUpInput';

export interface SignUpFormTypes {
  id: string;
  password: string;
  email: string;
  nickname: string;
}

export const SignUpFormErrorState = atom({
  key: 'SignUpFormErrorState',
  default: true,
});

export const SignUpFormState = atom<SignUpFormTypes>({
  key: 'SignUpFormState',
  default: { id: '', password: '', email: '', nickname: '' },
});

const CommonSignUpForm = () => {
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

  const disabled = () => signUpFormErrorValue || isBlankForm();

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
