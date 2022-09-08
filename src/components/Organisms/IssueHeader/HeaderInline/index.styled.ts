import styled from 'styled-components';

export const HeaderInline = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  margin-bottom: 16px;
`;

export const Title = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
  width: 940px;
  height: 48px;

  form {
    width: inherit;
  }

  .issueNumber {
    margin-left: 16px;
    color: ${({ theme }) => theme.COLORS.LABEL};
  }
`;

export const ButtonTab = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  button + button {
    margin-left: 8px;
  }
`;
