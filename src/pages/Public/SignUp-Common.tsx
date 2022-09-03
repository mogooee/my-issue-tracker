import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';

import styled from 'styled-components';
import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import CommonSignUpForm from '@/components/Organisms/CommonSignUpForm';

import Modal, { ModalState } from '@/components/Modal';
import CompleteSignUp from '@/components/Modal/CompleteSignUp';

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

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
    <StyledDiv>
      <CommonSignUpForm FORM_INFO={FORM_INFO} />
      {isModal && (
        <Modal>
          <CompleteSignUp id={id} />
        </Modal>
      )}
    </StyledDiv>
  );
};

export default CommonSignUp;
