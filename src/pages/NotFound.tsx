import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Atoms/Button';

const StyledNotFound = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  width: 100%;
  height: 80vh;

  span {
    font-size: 20rem;
  }

  h1 {
    padding: 20px;
    ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <StyledNotFound>
      <span>🚧</span>
      <h1>요청하신 페이지를 찾을 수 없습니다.</h1>
      <Button buttonStyle="STANDARD" label="메인으로" size="LARGE" handleOnClick={() => navigate('/')} />
    </StyledNotFound>
  );
};

export default NotFound;
