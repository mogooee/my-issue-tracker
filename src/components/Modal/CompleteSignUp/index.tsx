import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ModalState } from '@/stores/modal';

import * as S from '@/components/Modal/index.styles';
import Button from '@/components/Atoms/Button';
import { MODAL_BUTTON_INFO } from '@/components/Atoms/Button/options';

const CompleteSignUp = ({ id }: { id: string }) => {
  const setModalState = useSetRecoilState(ModalState);
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(3);

  const navigateMainPage = () => {
    navigate('/');
    setModalState(false);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      navigateMainPage();
    }, 3000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <S.ModalTitle>회원가입이 완료되었습니다!</S.ModalTitle>
      <S.ModalComment>{id}님 가입을 축하드립니다.</S.ModalComment>
      <S.ModalCaption>{count}초뒤에 자동으로 메인 화면으로 이동합니다.</S.ModalCaption>
      <Button {...MODAL_BUTTON_INFO.TO_MAIN} handleOnClick={navigateMainPage} />
    </>
  );
};

export default CompleteSignUp;
