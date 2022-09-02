import styled from 'styled-components';
import { MilestoneItem } from '@/components/Molecules/MilestoneItem/index.styles';
import { COLORS } from '@/styles/theme';

const skeletonRectangle = (width: number, height: number) => `
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: ${width}px;
  height: ${height}px;
  background: ${COLORS.LINE};

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(400px);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #d9dbe9, #e8e9f1, #d9dbe9);
    animation: loading 3s infinite linear;
  }
`;

export const SkeletonNavLink = styled.div`
  ${skeletonRectangle(300, 32)}
`;

export const SkeletonMilestoneItem = styled(MilestoneItem)`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'space-between' })};
`;

export const SkeletonMilestoneItemInfo = styled.div`
  .skeleton_milestone__item {
    ${skeletonRectangle(200, 24)}
    margin-bottom: 16px;
  }

  .skeleton_milestone__desc {
    ${skeletonRectangle(300, 20)}
  }
`;

export const SkeletonMilestoneItemStates = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'flex-end' })};

  .skeleton_milestone__buttons {
    ${skeletonRectangle(180, 24)}
    margin-bottom: 10px;
  }

  .skeleton_milestone__progress {
    ${skeletonRectangle(244, 50)}
  }
`;

export {
  StyledIssueTable as MilestoneTable,
  IssueHeader as MilestoneHeader,
} from '@/components/Organisms/IssueTable/index.styles';
