import styled from 'styled-components';
import { Label } from '@/components/Atoms/Label/index.styles';

export const IssueHeader = styled.div`
  &::after {
    display: block;
    content: '';
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.COLORS.LINE};
    margin: 32px 0px;
  }
`;

export const HeaderInline = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  margin-bottom: 16px;
`;

export const Info = styled.div<{ closed: boolean }>`
  ${Label} {
    display: inline-block;
    padding: 8px 16px;
    margin-bottom: 8px;
    & span {
      color: ${({ theme, closed }) => (!closed ? theme.COLORS.PRIMARY.BLUE : theme.COLORS.SECONDORY.PURPLE)};
    }
  }
`;

export const InfoText = styled.div`
  display: inline-block;
  margin-left: 8px;

  span {
    ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
    color: ${({ theme }) => theme.COLORS.BODY};
  }

  span + span {
    margin-left: 8px;
  }
`;
