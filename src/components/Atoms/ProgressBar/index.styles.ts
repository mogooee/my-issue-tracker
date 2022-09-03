import styled from 'styled-components';

export const PrograssBar = styled.progress`
  display: block;
  width: 244px;
  margin-bottom: 8px;
  appearance: none;

  &::-webkit-progress-bar {
    border-radius: 10px;
    background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
  }

  &::-webkit-progress-value {
    border-radius: 10px;
    background: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
  }
`;

export const PrograssState = styled.div`
  display: grid;
  width: 244px;
  grid-template-columns: 45% 25% 25%;
  gap: 8px;

  span {
    ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  }
`;

export const PrograssTitle = styled.span`
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
`;
