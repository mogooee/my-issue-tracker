import { StyledNavLinks } from '@/components/Molecules/NavLink/index.styles';
import styled from 'styled-components';

export const NavInline = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'baseline', justify: 'space-between' })};
  max-width: 1280px;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;

  @media screen and (max-width: 1120px) {
    ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'flex-start' })};
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

  ${StyledNavLinks} {
    min-width: max-content;
  }
`;

export const SubNav = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  gap: 16px;

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    flex-wrap: wrap;
  }
`;
