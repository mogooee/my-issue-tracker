import styled from 'styled-components';

export const StyledIssueTable = styled.div`
  width: 100%;
  z-index: 1;
  border-radius: 10px;
  color: ${({ theme }) => theme.COLORS.LABEL};
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};

  & > div {
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.LINE};

    &:last-child {
      border-radius: 0 0 10px 10px;
      border-bottom: none;
    }

    &:first-child {
    }
  }
`;

export const IssueHeader = styled.div`
  width: inherit;
  padding: 18px 24px;
  border-radius: 10px 10px 0 0;
  background: ${({ theme }) => theme.COLORS.BACKGROUND};
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'baseline', justify: 'flex-start' })};
  ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
`;

export const IssueStates = styled.div`
  margin-left: 32px;
`;

export const IssueInfoTabs = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'row' })};
  margin-left: auto;
  details + details {
    margin-left: 32px;
  }
`;
