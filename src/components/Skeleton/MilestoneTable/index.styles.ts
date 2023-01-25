import styled from 'styled-components';
import { MilestoneItem } from '@/components/Organisms/MilestoneTable/MilestoneItem/index.styles';
import { COLORS } from '@/styles/theme';

export const skeletonRectangle = (width: number, height: number) => `
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
  @media all and (min-width: 380px) {
    ${skeletonRectangle(300, 32)}
  }

  @media all and (max-width: 379px) {
    ${skeletonRectangle(200, 32)}
  }
`;

export const SkeletonMilestoneItem = styled(MilestoneItem)`
  gap: 14px;
`;

export const SkeletonMilestoneItemInfo = styled.div`
  @media all and (min-width: 380px) {
    .skeleton_milestone__item {
      ${skeletonRectangle(200, 24)}
      margin-bottom: 16px;
    }

    .skeleton_milestone__desc {
      ${skeletonRectangle(300, 20)}
    }
  }

  @media all and (max-width: 379px) {
    .skeleton_milestone__item {
      ${skeletonRectangle(120, 24)}
      margin-bottom: 16px;
    }

    .skeleton_milestone__desc {
      ${skeletonRectangle(165, 20)}
    }
  }
`;

export const SkeletonMilestoneItemStates = styled.div`
  flex-grow: 1;
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'flex-end' })};

  @media all and (min-width: 380px) {
    .skeleton_milestone__buttons {
      ${skeletonRectangle(180, 24)}
      margin-bottom: 10px;
    }

    .skeleton_milestone__progress {
      ${skeletonRectangle(244, 50)}
    }
  }

  @media all and (max-width: 379px) {
    .skeleton_milestone__buttons {
      ${skeletonRectangle(160, 24)}
      margin-bottom: 10px;
    }

    .skeleton_milestone__progress {
      ${skeletonRectangle(210, 50)}
    }
  }
`;

export { Table as MilestoneTable } from '@/components/Molecules/Table/index.styled';
export { Header as MilestoneHeader } from '@/components/Molecules/Table/TableHeader';
export { Item as MilestoneTableItem } from '@/components/Molecules/Table/TableItem/index';
