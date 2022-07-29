import { useRecoilValue } from 'recoil';
import { isError, SignUpFormState } from '@/stores/signUp';
import { useNavigate } from 'react-router-dom';
import { clickSignUpButtonHandler, OAuthNewMemberTypes } from '@/api/signUp';

import * as S from '@/components/Organisms/OauthSignUpForm/index.styles';
import Button from '@/components/Atoms/Button';
import Input, { InputTypes } from '@/components/Atoms/Input';
import SignUpInput from '@/components/Molecules/SignUpInput';

import { SignUpFormDataTypes } from '@/pages/Public/RedirectAuth';

const FORM_INFO = {
  id: 'nickname',
  inputType: 'text',
  maxLength: 12,
  placeholder: '닉네임',
  pattern: /^[ㄱ-힣a-zA-Z0-9-*~^_]{2,12}$/i,
  patternMsg: '다른 유저와 겹치지 않는 별명을 입력해주세요.(2~12자)',
  errMsg: '닉네임 형식에 맞게 입력해주세요',
};

const OAuthSignUpForm = ({ SignUpFormData }: { SignUpFormData: SignUpFormDataTypes | null }) => {
  const navigate = useNavigate();
  const signUpFormValue = useRecoilValue(SignUpFormState);

  const { email, profileImage, resourceOwnerId } = SignUpFormData!;

  const EMAIL_FORM: InputTypes = {
    disabled: true,
    inputSize: 'MEDIUM',
    inputType: 'email',
    inputValue: email,
    inputMaxLength: email.length,
    inputPlaceholder: '이메일',
  };

  const formData: OAuthNewMemberTypes = {
    email: email,
    nickname: signUpFormValue.nickname,
    profileImage: profileImage,
    authProviderType: 'GITHUB',
    resourceOwnerId: resourceOwnerId,
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
        disabled={isError()}
        handleOnClick={(e) => clickSignUpButtonHandler({ formData, type: 'auth', navigate })}
      />
    </S.OauthSignUpForm>
  );
};

export default OAuthSignUpForm;
