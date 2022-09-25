import styled from 'styled-components';
import { ReactionPanel } from '@/components/Molecules/Dropdown/Panel/Reaction/index.styled';
import { Label as StyledLabel } from '@/components/Atoms/Label/index.styles';
import DEFAULT_MARKDOWN from '@/styles/markdown';

export const CommentHeader = styled.div`
  display: grid;
  grid-template-columns: max-content auto max-content;
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL}
  height:28px;

  span + span {
    margin-left: 8px;
  }

  .author {
    color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
  }

  .timeStamp {
    color: ${({ theme }) => theme.COLORS.LABEL};
  }
`;

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

  button[label='삭제'] {
    color: ${({ theme }) => theme.COLORS.ERROR.RED};
  }

  ${ReactionPanel} {
    top: 0px;
    right: 25px;
  }
`;

export const CommentContent = styled.div`
  color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};

  ${ReactionPanel} {
    top: -58px;
    left: 0;
  }
  .markdown {
    padding: 0 8px;
    font-size: 100%;
    ${DEFAULT_MARKDOWN}
  }
`;

export const TextArea = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center', direction: 'column' })};
  width: 900px;
`;

export const TextAreaButtonTab = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  margin: 16px 0px 0px auto;
  button + button {
    margin-left: 8px;
  }
`;
