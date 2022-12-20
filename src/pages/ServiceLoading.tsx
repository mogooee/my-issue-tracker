import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
import styled from 'styled-components';

const StyledServiceLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  border-radius: 20px;
  background: white;

  h1 {
    width: fit-content;
    margin-bottom: 32px;
    ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
  }

  div {
    position: relative;
  }
`;

const ServiceLoading = () => (
  <StyledServiceLoading>
    <h1>서비스를 로딩중입니다.</h1>
    <LoadingSpinner size={80} />
  </StyledServiceLoading>
);

export default ServiceLoading;
