import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Atoms/Button';

const StyleNotExistIssue = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  width: 100%;
  height: 80vh;

  h1 {
    padding: 20px;
    ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
  }
`;

const NotExistIssue = ({ resetError }: { resetError: () => void }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/issues');
    resetError();
  };

  return (
    <StyleNotExistIssue>
      <h1>존재하지 않는 이슈입니다.</h1>
      <Button buttonStyle="STANDARD" label="이슈 페이지로" size="MEDIUM" handleOnClick={handleOnClick} />
    </StyleNotExistIssue>
  );
};

export default NotExistIssue;
