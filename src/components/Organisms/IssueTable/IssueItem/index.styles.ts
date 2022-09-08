import { Label } from '@/components/Atoms/Label/index.styles';
import styled from 'styled-components';

export const StyledIssueItem = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};

  .checkbox {
    margin-top: -35px;
  }
`;

export const StyledIssue = styled.div`
  margin-left: 32px;
`;

export const IssueTitle = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  margin-bottom: 8px;

  .title {
    ${({ theme }) => theme.FONTSTYLES.LINK_MEDIUM};
    margin: 0px 8px;
  }

  ${Label}:hover {
    cursor: pointer;
  }

  ${Label}+${Label} {
    margin-left: 8px;
  }
`;

export const IssueContent = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  span,
  a {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
  }

  color: ${({ theme }) => theme.COLORS.LABEL};

  .summary {
    margin: 0px 16px;
  }

  .milestone {
    display: inline-flex;
    align-items: center;

    svg {
      margin: -3px 8px 0 0;
    }

    path {
      stroke: ${({ theme }) => theme.COLORS.LABEL};
      fill: ${({ theme }) => theme.COLORS.LABEL};
    }
  }
`;

export const Assignee = styled.div`
  margin-left: auto;
  img + img {
    margin-left: -10px;
  }
`;

export const Template = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 60px auto 100px;

  .checkbox {
    margin-top: -35px;
  }
`;
