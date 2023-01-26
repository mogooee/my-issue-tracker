import styled, { css } from 'styled-components';

export const MilestoneEditForm = styled.div<{ editMode: 'ADD' | 'MODIFY' }>`
  width: 100%;
  padding: 32px;
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};

  h2 {
    ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
    margin-bottom: 24px;
  }

  ${({ editMode }) =>
    editMode === 'ADD' &&
    css`
      margin-bottom: 24px;
      border: 1px solid ${({ theme }) => theme.COLORS.LINE};
      border-radius: 16px;
    `}
`;

export const EditForm = styled.div`
  display: grid;
  grid-auto-rows: minmax(40px, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  div {
    form {
      width: 100%;
      height: 100%;
    }
  }

  @media all and (min-width: ${({ theme }) => `${theme.DEVICE_SIZE.TABLET}px`}) {
    div:last-child {
      grid-column: 1 / 3;
    }
  }
`;

export const EditButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media all and (min-width: ${({ theme }) => `${theme.DEVICE_SIZE.LARGE_MOBILE}px`}) {
    justify-content: flex-end;
  }

  @media all and (max-width: ${({ theme }) => `${theme.DEVICE_SIZE.LARGE_MOBILE - 1}px`}) {
    justify-content: center;
  }
`;
