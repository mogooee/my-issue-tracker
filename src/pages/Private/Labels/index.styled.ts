import styled from 'styled-components';
import { LabelEditForm } from '@/components/Molecules/LabelEditForm/index.styled';
import { StyledNavLink, StyledNavLinks } from '@/components/Molecules/NavLink/index.styles';

export const Labels = styled.div`
  & > ${LabelEditForm} {
    margin-bottom: 24px;
    border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  }
`;

export const SubNav = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  flex-wrap: wrap;
  gap: 10px;

  margin-bottom: 24px;

  div {
    overflow: hidden;
  }

  ${StyledNavLinks} {
    min-width: max-content;
  }

  ${StyledNavLink} {
    &.active {
      background: ${({ theme }) => theme.COLORS.LINE};
    }
  }
`;
