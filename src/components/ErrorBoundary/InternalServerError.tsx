import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Atoms/Button';

const StyledInternalServerError = styled.div`
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
  p {
    margin-bottom: 36px;
    text-align: center;
    ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
  }
  .nav_btns {
    ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
    gap: 8px;
    button {
      width: 160px;
    }
  }
`;

const InternalServerError = () => {
  const navigate = useNavigate();

  return (
    <StyledInternalServerError>
      <span>⚠️</span>
      <h1> 앗 서비스에 문제가 생겼나봐요!</h1>
      <p>
        문제를 해결하기 위해 노력하고 있습니다.
        <br />
        잠시 후 다시 확인해주세요.
      </p>
      <div className="nav_btns">
        <Button buttonStyle="STANDARD" label="이전" size="MEDIUM" handleOnClick={() => navigate(-1)} />
        <Button buttonStyle="STANDARD" label="메인으로" size="MEDIUM" handleOnClick={() => navigate('/')} />
      </div>
    </StyledInternalServerError>
  );
};

export default InternalServerError;
