/* eslint-disable react/prop-types */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSignUpFormError, SignUpFormState } from '@/stores/signUp';
import { signup, GeneralNewMemberTypes } from '@/api/sign';

import * as S from '@/components/Organisms/CommonSignUpForm/index.styles';
import Button from '@/components/Atoms/Button';
import SignUpInput from '@/components/Molecules/SignUpInput';
import { ModalState } from '@/stores/modal';

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
  const setModalState = useSetRecoilState(ModalState);
  const signUpFormValue = useRecoilValue(SignUpFormState);
  const { id, password, email, nickname } = signUpFormValue;

  const formData: GeneralNewMemberTypes = {
    signInId: id,
    password,
    email,
    nickname,
    profileImage: null,
  };

  const isBlank = () => {
    let blank = false;

    Object.keys(signUpFormValue).forEach((key) => {
      const k = key as keyof typeof signUpFormValue;
      if (!signUpFormValue[k]) blank = true;
    });

    return blank;
  };

  const disabled = useSignUpFormError() || isBlank();

  const signUp = async () => {
    await signup({ formData, type: 'general' });
    setModalState(true);
  };

  return (
    <S.CommonSignUpForm>
      <h1>회원가입</h1>
      {FORM_INFO.map(({ ...props }) => (
        <SignUpInput key={props.id} {...props} />
      ))}
      <Button buttonStyle="STANDARD" label="회원가입" size="LARGE" disabled={disabled} handleOnClick={signUp} />
    </S.CommonSignUpForm>
  );
};

export default CommonSignUpForm;
