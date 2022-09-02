import styled from 'styled-components';
import { AddLabelField } from '@/components/Molecules/AddLabelField/index.styled';
import { LabelTable } from '@/components/Skeleton/LabelTable/index.styled';

export const LabelList = styled.div`
  & > ${AddLabelField} {
    margin-bottom: 24px;
    border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  }

  ${LabelTable} {
    margin-top: 66px;
  }
`;

export const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  div {
    overflow: hidden;
  }
`;
