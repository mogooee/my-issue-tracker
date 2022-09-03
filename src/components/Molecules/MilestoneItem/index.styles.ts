import styled, { css } from 'styled-components';
import { StyledIssueItem } from '@/components/Molecules/IssueItem/index.styles';

export const MilestoneItem = styled(StyledIssueItem)`
  display: flex;
  justify-content: space-between;
`;

export const CommonMilestoneItem = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  padding: 24px 32px;

  span {
    ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
    color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
    margin-left: 8px;
  }
`;

export const MilestoneItemInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  align-items: baseline;

  .MilestoneItem_title {
    span {
      ${({ theme }) => theme.FONTSTYLES.LINK_MEDIUM};
      color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
      margin-left: 8px;
    }
  }

  .MilestoneItem_dueDate {
    display: flex;
    align-items: center;
    margin-left: 2px;
    span {
      ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
      color: ${({ theme }) => theme.COLORS.LABEL};
      margin-left: 8px;
    }
  }

  .MilestoneItem_description {
    min-height: 28px;
    grid-column: 1 / 3;
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
    color: ${({ theme }) => theme.COLORS.LABEL};
  }
`;

export const MilestoneItemButtons = styled.div<{ isOpenModifyEditer: boolean }>`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-end' })};
  gap: 24px;

  button {
    :not(&:last-child):hover {
      color: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
      svg {
        stroke: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
      }
    }

    &:last-child {
      color: ${({ theme }) => theme.COLORS.ERROR.RED};

      &:hover {
        color: ${({ theme }) => theme.COLORS.ERROR.DARK_RED};
        svg {
          stroke: ${({ theme }) => theme.COLORS.ERROR.DARK_RED};
        }
      }
    }

    ${({ isOpenModifyEditer }) =>
      isOpenModifyEditer &&
      css`
        &:nth-child(2) {
          color: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
          svg {
            stroke: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
          }
        }
      `}
  }
`;
