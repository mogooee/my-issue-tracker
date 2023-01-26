import { Label } from '@/components/Atoms/Label/index.styles';
import styled from 'styled-components';

export const Template = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 60px auto 100px;
  padding: 16px 32px;

  .checkbox {
    margin-top: -35px;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    grid-template-columns: auto auto;

    .checkbox {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    img {
      display: none;
    }

    .summary {
      margin: 0px;
    }
  }
`;

export const StyledIssueItem = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
`;

export const StyledIssue = styled.div`
  margin-left: 32px;
`;

export const IssueTitle = styled.div`
  display: grid;
  align-items: baseline;
  justify-content: start;
  grid-template-columns: 20px auto max-content;
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

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    width: 100%;
    grid-template-columns: repeat(2, auto);

    div {
      grid-column: 1 / 4;
      overflow: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .title {
      ${({ theme }) => theme.FONTSTYLES.LINK_MEDIUM};
      margin-bottom: 8px;
    }
  }
`;

export const Labels = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
`;

export const IssueContent = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  color: ${({ theme }) => theme.COLORS.LABEL};

  span,
  a {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
  }

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

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    align-items: flex-start;
    .summary {
      margin: 0px;
    }
    .milestone {
      display: none;
    }

    span:first-child {
      margin-right: 8px;
    }
  }
`;

export const Assignee = styled.div`
  margin-left: auto;
  img + img {
    margin-left: -10px;
  }
`;
