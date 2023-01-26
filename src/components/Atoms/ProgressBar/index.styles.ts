import styled from 'styled-components';

export const ProgressBar = styled.progress`
  display: block;
  width: 244px;
  height: 10px;
  margin-bottom: 8px;
  appearance: none;
  height: 10px;

  &::-webkit-progress-bar {
    border-radius: 10px;
    background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
  }

  &::-webkit-progress-value {
    border-radius: 10px;
    background: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
  }
`;

export const ProgressState = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;

  div {
    span + span {
      margin-left: 8px;
    }
  }

  span {
    ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  }
`;

export const ProgressTitle = styled.span`
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
`;
