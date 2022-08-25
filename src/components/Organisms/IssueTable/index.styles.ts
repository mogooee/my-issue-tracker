import styled from 'styled-components';

export const IssueStates = styled.div`
  height: inherit;
`;

export const IssueInfoTabs = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'row' })};
  margin-left: auto;
  details + details {
    margin-left: 32px;
  }
`;
