import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSignUpFormError, SignUpFormState } from '@/stores/signUp';

import { signup, OAuthNewMemberTypes, OAuthResponse, SignUpFormDataTypes } from '@/api/sign';

import * as S from '@/components/Organisms/OauthSignUpForm/index.styles';
import Button from '@/components/Atoms/Button';
import Input, { InputTypes } from '@/components/Atoms/Input';
import SignUpInput from '@/components/Molecules/SignUpInput';

import useLogin from '@/api/sign/useLogin';

const FORM_INFO = {
  id: 'nickname',
  inputType: 'text',
  maxLength: 12,
  placeholder: '닉네임',
  pattern: /^[ㄱ-힣a-zA-Z0-9-*~^_]{2,12}$/i,
  patternMsg: '다른 유저와 겹치지 않는 별명을 입력해주세요.(2~12자)',
  errMsg: '닉네임 형식에 맞게 입력해주세요',
};

const EMAIL_INFO: InputTypes = {
  disabled: true,
  inputSize: 'MEDIUM',
  inputType: 'email',
  inputValue: '',
  inputMaxLength: 0,
  inputPlaceholder: '이메일',
};

const OAuthSignUpForm = ({ SignUpFormData }: { SignUpFormData: SignUpFormDataTypes | null }) => {
  const { setSuccessLoginState, saveAuthLoginState } = useLogin();
  const navigate = useNavigate();
  const signUpFormValue = useRecoilValue(SignUpFormState);

  const { email, profileImage, resourceOwnerId } = SignUpFormData!;

  const EMAIL_FORM: InputTypes = { ...EMAIL_INFO, inputValue: email, inputMaxLength: email.length };

  const disabled = useSignUpFormError() || !signUpFormValue.nickname;

  const formData: OAuthNewMemberTypes = {
    email,
    nickname: signUpFormValue.nickname,
    profileImage,
    authProviderType: 'KAKAO',
    resourceOwnerId,
  };

  const signUp = async () => {
    const { memberResponse } = (await signup({ formData, type: 'auth' })) as OAuthResponse;
    setSuccessLoginState();
    saveAuthLoginState(memberResponse!);
    navigate('/issues');
  };

  return (
    <S.OauthSignUpForm>
      <h1>추가 정보 입력</h1>
      <div className="email_form">
        <span>해당하는 이메일로 가입이 진행됩니다.</span>
        <Input key={EMAIL_FORM.inputType} {...EMAIL_FORM} />
      </div>
      <SignUpInput key={FORM_INFO.id} {...FORM_INFO} />
      <Button
        buttonStyle="STANDARD"
        label="동의하고 가입하기"
        size="LARGE"
        disabled={disabled}
        handleOnClick={signUp}
      />
    </S.OauthSignUpForm>
  );
};

export default OAuthSignUpForm;
