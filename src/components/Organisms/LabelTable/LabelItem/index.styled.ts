import styled from 'styled-components';
import { Label } from '@/components/Atoms/Label/index.styles';

export const LabelItem = styled.div`
  display: grid;
  grid-template-columns: 240px auto 240px;
  align-items: center;
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
