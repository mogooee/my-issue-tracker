import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';

import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import CommonSignUpForm from '@/components/Organisms/CommonSignUpForm';

import Modal from '@/components/Modal';
import { ModalState } from '@/stores/modal';

import CompleteSignUp from '@/components/Modal/CompleteSignUp';

import * as S from '@/pages/Public/SignUp-Common/index.styles';

const CommonSignUp = () => {
  window.history.forward();

  const resetSignUpFormErrorState = useResetRecoilState(SignUpFormErrorState);
  const resetSignUpFormState = useResetRecoilState(SignUpFormState);

  const isModal = useRecoilValue(ModalState);
  const signUpFormValue = useRecoilValue(SignUpFormState);
  const { id } = signUpFormValue;

  useEffect(() => {
    resetSignUpFormErrorState();
    resetSignUpFormState();
  }, []);

  return (
    <S.CommonSignUp>
      <CommonSignUpForm FORM_INFO={FORM_INFO} />
      {isModal && (
        <Modal>
          <CompleteSignUp id={id} />
        </Modal>
      )}
    </S.CommonSignUp>
  );
};

export default CommonSignUp;
