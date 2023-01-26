import styled from 'styled-components';

export const IssueHistory = styled.div`
  position: relative;
  gap: 5px;
  margin-left: 92px;
  padding: 20px 0px 20px 32px;
  border-left: 1px solid ${({ theme }) => theme.COLORS.LINE};

  img {
    width: 28px;
    height: 28px;
    vertical-align: bottom;
  }

  span,
  strong {
    display: inline-block;
    cursor: default;
    vertical-align: text-bottom;
    margin-left: 5px;
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
  }

  strong {
    ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    margin-left: 20px;
  }
`;

export const HistoryLabel = styled.div`
  display: inline-block;
  margin-left: 5px;

  div {
    display: inline-block;
    padding: 0 12px;
  }

  span {
    cursor: pointer;
  }
`;
