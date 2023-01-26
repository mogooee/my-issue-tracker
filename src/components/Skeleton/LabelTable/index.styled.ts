import { COLORS } from '@/styles/theme';
import styled, { keyframes } from 'styled-components';
import { Header } from '@/components/Molecules/Table/TableHeader';
import { LabelItem } from '@/components/Organisms/LabelTable/LabelItem/index.styled';

const skeletonGradient = keyframes`
0%, 100% {
  background: ${COLORS.BACKGROUND};
}
50% {
  background: ${COLORS.LINE};
}
`;

export const SkeletonDiv = styled.div`
  height: 28px;
  border-radius: 8px;
  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
`;

export const LabelTableHeader = styled(Header)`
  grid-template-columns: 35%;
  background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
`;

export const SkeletonLabelItem = styled(LabelItem)`
  gap: 24px;
  height: 100px;

  .label-icon,
  .label-description,
  .label-button-tabs {
    width: 100%;
  }

  .label-button-tabs {
    justify-self: end;
  }
`;

export { Table as LabelTable } from '@/components/Molecules/Table/index.styled';
export { Item as LabelTableItem } from '@/components/Molecules/Table/TableItem/index';
