/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isError, SignUpFormState } from '@/stores/signUp';
import { postSignUpData, GeneralNewMemberTypes, MemeberResponseTypes } from '@/api/signUp';
import useLogin from '@/hooks/useLogin';

import * as S from '@/components/Organisms/CommonSignUpForm/index.styles';
import Button from '@/components/Atoms/Button';
import SignUpInput from '@/components/Molecules/SignUpInput';
import { ModalState } from '@/components/Modal';

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
  const navigate = useNavigate();
  const { onSuccessLogin } = useLogin();

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

  const disabled = isError() || isBlank();

  const signUp = async () => {
    const memberResponse = (await postSignUpData({ formData, type: 'general' })) as MemeberResponseTypes;
    onSuccessLogin(memberResponse);
    navigate('/issues');
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
