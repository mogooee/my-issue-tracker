import styled from 'styled-components';

export const HeaderInline = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  margin-bottom: 16px;

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column-reverse', align: 'flex-start' })};
  }
`;

export const Title = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
  ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
  max-width: 940px;
  min-height: 48px;
  max-height: max-content;

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

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    margin-bottom: 16px;
  }
`;
