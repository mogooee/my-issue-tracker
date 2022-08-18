import styled from 'styled-components';

export const LoadingSpinner = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 10px solid ${({ theme }) => theme.COLORS.BACKGROUND};
  border-top: 10px solid ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
  border-radius: 50%;
  animation: spinner 1s linear infinite;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  margin: auto;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
