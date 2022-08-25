import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { NavLinkTypes } from '@/components/Molecules/NavLink';

type StyledNavLinkTypes = Pick<NavLinkTypes, 'navLinkStyle'>;

export const StyledNavLinks = styled.div<StyledNavLinkTypes>`
  width: fit-content;
  ${({ navLinkStyle }) => {
    if (navLinkStyle === 'LINE') {
      return css`
        border-radius: 11px;
        border: 1px solid ${({ theme }) => theme.COLORS.LINE};

        a {
          padding: 6px 32px;
        }

        a + a {
          border-left: 1px solid ${({ theme }) => theme.COLORS.LINE};
        }
      `;
    }
  }}
`;

export const StyledNavLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  padding: 0 10px;

  ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
  color: ${({ theme }) => theme.COLORS.LABEL};

  svg {
    margin-right: 5px;
  }

  path {
    stroke: ${({ theme }) => theme.COLORS.LABEL};
  }

  &.active {
    color: ${({ theme }) => theme.COLORS.BODY};
    background: ${({ theme }) => theme.COLORS.LINE};
    path {
      stroke: ${({ theme }) => theme.COLORS.TITLE_ACVITE};
    }
  }
`;
