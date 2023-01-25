import styled from 'styled-components';

export const Table = styled.div`
  max-width: 1280px;
  border-radius: 10px;
  color: ${({ theme }) => theme.COLORS.LABEL};
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
`;
