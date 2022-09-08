import styled from 'styled-components';
import { Label as StyledLabel } from '@/components/Atoms/Label/index.styles';
import { ReactionPanel } from '@/components/Molecules/Dropdown/Panel/Reaction/index.styled';

export const CommentTab = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  gap: 0px 24px;

  &,
  button,
  ${StyledLabel} span {
    color: ${({ theme }) => theme.COLORS.LABEL};
  }

  button {
    height: fit-content;
  }

  ${ReactionPanel} {
    top: 0px;
    right: 25px;
  }
`;
