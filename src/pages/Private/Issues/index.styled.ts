import styled from 'styled-components';

export const NavInline = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  width: 1280px;
  margin-bottom: 24px;
`;

export const SubNav = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};

  button {
    margin-left: 16px;
  }
`;
