import styled from 'styled-components';
import { ReactionPanel } from '@/components/Molecules/Dropdown/Panel/Reaction/index.styled';

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

export const CommentContent = styled.div`
  color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};

  ${ReactionPanel} {
    top: -58px;
    left: 0;
  }
`;
