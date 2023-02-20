import React from 'react';
import Button from '@/components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import * as S from '@/components/Organisms/DuplicateEmail/index.styles';

interface DuplicateEmailTypes {
  provider: 'GITHUB' | 'NAVER' | 'KAKAO' | '이메일 가입하기';
  email: string;
  handleOnClick: () => void;
}

const DuplicateEmail = ({ provider, email, handleOnClick }: DuplicateEmailTypes): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <S.DuplicateEmail>
      <S.Header>
        <h1>{`'${provider}'로 \n 이미 가입한 계정이 있습니다.`}</h1>
        <p>{email}</p>
      </S.Header>
      <Button
        buttonStyle="STANDARD"
        label="다른 방식으로 가입 또는 기존 계정 로그인"
        size="LARGE"
        handleOnClick={() => {
          handleOnClick();
          navigate('/login');
        }}
      />
    </S.DuplicateEmail>
  );
};

export default DuplicateEmail;
