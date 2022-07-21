import * as S from '@/components/Organisms/CommonSignUpForm/index.styles';
import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import Button from '@/components/Atoms/Button';
import SignUpInput from '@/components/Molecules/SignUpInput';

const CommonSignUpForm = () => {
  return (
    <S.CommonSignUpForm>
      {FORM_INFO.map(({ ...props }) => {
        return <SignUpInput {...props} />;
      })}

      <Button buttonStyle="STANDARD" label="회원가입" size="LARGE" disabled />
    </S.CommonSignUpForm>
  );
};

export default CommonSignUpForm;
