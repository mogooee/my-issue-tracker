import styled from 'styled-components';

import { CommonMilestoneItem } from '@/components/Organisms/MilestoneTable/MilestoneItem/index.styles';

export const IssueStates = styled.div`
  height: inherit;
`;

export const IssueInfoTabs = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'row' })};
  margin-left: auto;
  details + details {
    margin-left: 32px;
  }
`;

export const IssueTableHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 60px 500px auto;
`;

export const NoSearchResult = styled(CommonMilestoneItem)`
  color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
`;
