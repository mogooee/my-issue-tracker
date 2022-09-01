import styled from 'styled-components';
import { AddLabelField } from '@/components/Molecules/AddLabelField/index.styled';
import { Label } from '@/components/Atoms/Label/index.styles';

export const LabelTable = styled.div`
  ${AddLabelField} {
    border: none;
  }
`;

export const LabelItem = styled.div<{ templateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  align-items: center;
  padding: 36px 32px;
  ${Label} {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Description = styled.span`
  width: 800px;
`;

export const EditButton = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};

  button {
    &:first-child {
      color: ${({ theme }) => theme.COLORS.LABEL};
    }
    &:nth-child(2) {
      color: ${({ theme }) => theme.COLORS.ERROR.RED};
    }
  }

  button + button {
    margin-left: 24px;
  }
`;
