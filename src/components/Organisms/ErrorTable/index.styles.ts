import styled from 'styled-components';
import { CommonMilestoneItem } from '@/components/Molecules/MilestoneItem/index.styles';
import { Header } from '@/components/Molecules/Table/TableHeader';

export const ErrorHeader = styled(Header)`
  gap: 20px;
`;

export const ErrorItem = styled(CommonMilestoneItem)`
  button {
    margin-left: 12px;
    border-radius: 8px;
    width: fit-content;
    height: 32px;
    background: ${({ theme }) => theme.COLORS.PLACEHOLDER};

    &:active:not([disabled]) {
      border: none;
      background: ${({ theme }) => theme.COLORS.PRIMARY.LIGHT_BLUE};
      color: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};

      svg {
        stroke: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
      }
    }
  }
`;

export const TableTab = styled.div`
  display: flex;
  div + div {
    margin-left: 24px;
  }
`;
