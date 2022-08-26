import styled from 'styled-components';
import * as StyledAddLabelField from '@/components/Molecules/AddLabelField/index.styled';

export const LabelTable = styled.div`
  ${StyledAddLabelField.AddLabelField} {
    border: none;
  }
`;

export const LabelItem = styled.div<{ templateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  align-items: center;
  padding: 36px 32px;
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
