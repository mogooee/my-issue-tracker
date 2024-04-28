import styled from 'styled-components';

import { CommonMilestoneItem } from '@/components/Organisms/MilestoneTable/MilestoneItem/index.styles';

export const IssueStates = styled.div`
  height: inherit;
`;

export const IssueInfoTabs = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'row', justify: 'flex-end' })};
  gap: 32px;

  @media ${({ theme }) => theme.DEVICE.TABLET} {
    gap: 24px;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    justify-content: space-around;
    gap: 4px;

    details:nth-child(1),
    details:nth-child(2) {
      menu {
        left: 0;
      }
    }
  }
`;

export const IssueTableHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 60px auto auto;
  width: 100%;

  @media ${({ theme }) => theme.DEVICE.TABLET} {
    grid-template-columns: 60px auto auto;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    grid-template-columns: auto;

    & > div:nth-child(1),
    & > div:nth-child(2) {
      display: none;
    }

    & > div:nth-child(3) {
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

export const NoSearchResult = styled(CommonMilestoneItem)`
  color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
`;
