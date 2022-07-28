import { useRecoilValue } from 'recoil';
import { isError, SignUpFormState } from '@/stores/signUp';

import { useNavigate } from 'react-router-dom';
import { clickSignUpButtonHandler, GeneralNewMemberTypes } from '@/api/signUp';

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
  const navigate = useNavigate();
  const signUpFormValue = useRecoilValue(SignUpFormState);
  const { id, password, email, nickname } = signUpFormValue;

  const formData: GeneralNewMemberTypes = {
    loginId: id,
    password: password,
    email: email,
    nickname: nickname,
    profileImage: null,
  };

  return (
    <S.CommonSignUpForm>
      <h1>회원가입</h1>
      {FORM_INFO.map(({ ...props }) => {
        return <SignUpInput key={props.id} {...props} />;
      })}
      <Button
        buttonStyle="STANDARD"
        label="회원가입"
        size="LARGE"
        disabled={isError()}
        handleOnClick={(e) => clickSignUpButtonHandler({ formData, type: 'general', navigate })}
      />
    </S.CommonSignUpForm>
  );
};

export default CommonSignUpForm;
