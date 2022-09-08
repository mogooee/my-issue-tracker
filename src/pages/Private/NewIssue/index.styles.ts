import styled, { css } from 'styled-components';

export const NewIssue = styled.div`
  width: 1280px;
  h1 {
    ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 32px 0;
  background: ${({ theme }) => theme.COLORS.LINE};
`;

export const NewIssueEditer = styled.div`
  width: 100%;
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'space-between' })};
`;

export const NewIssueForm = styled.div<{ isActive: boolean }>`
  width: 880px;

  form {
    position: relative;
    width: 100%;
    margin-bottom: 16px;
    border: ${({ isActive }) =>
      isActive
        ? css`1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE}`
        : css`1px solid ${({ theme }) => theme.COLORS.LINE}`};
  }
`;

export const NewIssueButtons = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-end' })};
  gap: 32px;
`;
