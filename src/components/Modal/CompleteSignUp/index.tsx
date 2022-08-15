import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import * as S from '@/components/Modal/CompleteSignUp/index.styles';
import Button from '@/components/Atoms/Button';
import { ModalState } from '@/components/Modal';

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
      <S.Title>회원가입이 완료되었습니다!</S.Title>
      <S.Comment>{id}님 가입을 축하드립니다.</S.Comment>
      <S.MoveComment>{count}초뒤에 자동으로 메인 화면으로 이동합니다.</S.MoveComment>
      <Button buttonStyle="STANDARD" label="메인으로" size="LARGE" handleOnClick={navigateMainPage} />
    </>
  );
};

export default CompleteSignUp;
