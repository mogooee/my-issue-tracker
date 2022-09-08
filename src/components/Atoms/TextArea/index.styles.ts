import styled, { css } from 'styled-components';

export const TextAreaContainer = styled.div<{ isActive: boolean }>`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'flex-start', justify: 'center' })};
  max-width: 880px;
  border-radius: 16px;

  ${({ isActive }) =>
    isActive
      ? css`
          border: 1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
          background: ${({ theme }) => theme.COLORS.OFF_WHITE};
        `
      : css`
          border: 1px solid ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
          background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
        `}
`;

export const TextAreaLabel = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'space-between' })};
  padding: 16px 24px 0 24px;
  width: 100%;
  color: ${({ theme }) => theme.COLORS.LABEL};
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL}
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 290px;
  padding: 16px 24px;
  border: none;
  background: none;
  resize: none;
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL}

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
  }

  &:focus {
    outline: none;
  }
`;

export const TextAreaAddFile = styled.div<{ isActive: boolean }>`
  border-top:  ${({ isActive }) =>
    isActive
      ? css`1px dashed ${({ theme }) => theme.COLORS.TITLE_ACTIVE};`
      : css`1px dashed ${({ theme }) => theme.COLORS.LINE};`}
  width: 100%;
  padding: 16px 24px;

  label {
    ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'flex-start' })};
  }

  input {
    display: none;
  }

  svg {
    cursor: pointer;
  }

  span {
    margin-left: 10px;
    ${({ theme }) => theme.FONTSTYLES.LINK_XSMALL}
    color: ${({ theme }) => theme.COLORS.LABEL};
    cursor: pointer;
  }
`;
