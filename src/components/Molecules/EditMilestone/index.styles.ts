import styled, { css } from 'styled-components';

export const EditMilestone = styled.div<{ editMode: 'ADD' | 'MODIFY' }>`
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
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  div {
    form {
      width: 100%;
    }
    &:last-child {
      grid-column: 1 / 3;
    }
  }
`;

export const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
