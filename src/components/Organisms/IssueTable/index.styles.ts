import styled from 'styled-components';

export const StyledIssueTable = styled.table`
  width: 1280px;
  border-collapse: collapse;
  border-radius: 10px;
  border-style: hidden;
  overflow: hidden;
  color: ${({ theme }) => theme.COLORS.LABEL};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.LINE};
`;

export const IssueHeader = styled.thead`
  width: inherit;
  height: 64px;
  padding: 32px 24px;
  background: ${({ theme }) => theme.COLORS.BACKGROUND};
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};

  tr {
    width: inherit;
  }

  th {
    ${({ theme }) => theme.MIXIN.FLEX({ align: 'baseline', justify: 'flex-start' })};
  }
`;

export const IssueStates = styled.div`
  margin-left: 32px;
`;

export const IssueInfoTabs = styled.div`
  margin-left: auto;
`;

export const IssueContent = styled.tbody`
  width: inherit;
  height: 100px;

  td > div {
    padding: 32px 24px;
    border-top: 1px solid ${({ theme }) => theme.COLORS.LINE};
  }
`;
