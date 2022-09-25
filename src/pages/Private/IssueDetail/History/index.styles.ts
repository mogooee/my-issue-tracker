import styled from 'styled-components';

export const IssueHistory = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
  margin-left: 92px;
  padding: 20px 32px;
  border-left: 1px solid ${({ theme }) => theme.COLORS.LINE};

  img {
    width: 28px;
    height: 28px;
  }

  .previous_title,
  .changed_title {
    ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
  }

  .previous_title {
    text-decoration: line-through;
  }

  span {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
    color: ${({ theme }) => theme.COLORS.BODY};
    cursor: default;
  }

  strong {
    ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
    cursor: default;
  }
`;

export const HistoryLabel = styled.div`
  div {
    padding: 0 12px;
  }

  span {
    cursor: pointer;
  }
`;
