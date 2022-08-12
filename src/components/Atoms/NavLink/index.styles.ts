import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
    color: black;
    path {
      stroke: ${({ theme }) => theme.COLORS.TITLE_ACVITE};
    }
  }
`;
