import styled from 'styled-components';
import { StyledNavLinks } from '@/components/Molecules/NavLink/index.styles';

export const Pagination = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  gap: 20px;
  margin: 40px 0;

  ${StyledNavLinks} {
    a {
      ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
      border: 1px solid transparent;
      border-radius: 6px;
      padding: 0px 12px;

      &:hover {
        border: 1px solid ${({ theme }) => theme.COLORS.LINE};
      }
    }

    a.isActive {
      background: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
      color: ${({ theme }) => theme.COLORS.OFF_WHITE};
    }

    a + a {
      margin-left: 5px;
    }
  }

  button:hover:not([disabled]) {
    color: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
  }
`;
