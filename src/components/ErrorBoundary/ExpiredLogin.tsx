import OAuthState from '@/stores/auth';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Button from '@/components/Atoms/Button';
import styled from 'styled-components';

const StyledExpiredLogin = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  width: 100%;
  height: 100vh;

  h1 {
    ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
    margin-bottom: 8px;
  }

  p {
    ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
    margin-bottom: 12px;
  }
`;

const ExpiredLogin = ({ resetError }: { resetError: () => void }) => {
  const navigate = useNavigate();
  const setIsOAuth = useSetRecoilState(OAuthState);

  const handleOnClick = () => {
    window.localStorage.removeItem('Authentication');
    setIsOAuth(false);
    navigate('/login');
    resetError();
  };

  return (
    <StyledExpiredLogin>
      <h1>로그인이 만료되었습니다 🥺</h1>
      <p>다시 로그인 후 시도해 주세요</p>
      <Button buttonStyle="STANDARD" label="로그인 하기" size="LARGE" handleOnClick={handleOnClick} />
    </StyledExpiredLogin>
  );
};

export default ExpiredLogin;
