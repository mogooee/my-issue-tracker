import styled from 'styled-components';

export const NavInline = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'baseline', justify: 'space-between' })};
  max-width: 1280px;

  @media screen and (max-width: 1120px) {
    ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'flex-start' })};
    margin-bottom: 20px;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    & > div:nth-child(1) {
      width: 100%;

      div,
      form {
        width: 100%;
      }

      span {
        min-width: 32px;
      }
    }
  }
`;

export const SubNav = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};

  button {
    margin-left: 16px;
  }
`;
