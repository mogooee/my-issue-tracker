import styled from 'styled-components';
import { skeletonRectangle } from '@/components/Skeleton/MilestoneTable/index.styles';

export const IssueHeader = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 5% 65% 30%;
  padding: 16px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.LINE};

  .skeleton-issue__nav-link {
    ${skeletonRectangle(232, 32)}
  }

  .skeleton-issue__filter {
    ${skeletonRectangle(360, 32)}
  }
`;

export const IssueCheckbox = styled.div`
  ${skeletonRectangle(16, 16)}
  border-radius: 2px;
`;

export const IssueItem = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% auto 2%;
  padding: 16px 32px;

  .item__title {
    ${skeletonRectangle(360, 32)}
  }

  .item__desc {
    margin-top: 8px;
    ${skeletonRectangle(400, 28)}
  }

  .skeleton-issue__user {
    ${skeletonRectangle(20, 20)}
    border-radius: 50%;
  }
`;

export { Table as IssueTable } from '@/components/Molecules/Table/index.styled';
export { Item as IssueTableItem } from '@/components/Molecules/Table/TableItem/index';
