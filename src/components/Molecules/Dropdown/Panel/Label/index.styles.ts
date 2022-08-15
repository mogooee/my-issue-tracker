import styled from 'styled-components';

export const PreviewLabel = styled.div`
  margin-right: 8px;

  &,
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  img {
    border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  }
`;
