import styled from 'styled-components';
import { Label } from '@/components/Atoms/Label/index.styles';

export const HeaderInline = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  margin-bottom: 16px;
`;

export const Info = styled.div<{ closed: boolean }>`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  gap: 8px;

  ${Label} {
    padding: 8px 16px;
    & span {
      color: ${({ theme, closed }) => (!closed ? theme.COLORS.PRIMARY.BLUE : theme.COLORS.SECONDORY.PURPLE)};
    }
  }

  & > span {
    ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
    color: ${({ theme }) => theme.COLORS.BODY};
  }
`;
