import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Atoms/Button';

const StyledNotValidRedirectCode = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  h1 {
    margin-bottom: 40px;
    ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
  }
`;

const NotValidRedirectCode = ({ resetError }: { resetError: () => void }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
    resetError();
  };

  return (
    <StyledNotValidRedirectCode>
      <h1>유효하지 않은 페이지입니다.</h1>
      <Button buttonStyle="STANDARD" label="메인으로" size="LARGE" handleOnClick={handleOnClick} />
    </StyledNotValidRedirectCode>
  );
};

export default NotValidRedirectCode;
