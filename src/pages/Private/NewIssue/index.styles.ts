import styled, { css } from 'styled-components';

export const NewIssue = styled.div`
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
  ${({ theme }) => theme.MIXIN.GRID({ align: 'flex-start' })};
  grid-template-columns: auto 1fr max-content;
  gap: 12px;

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column' })};

    img {
      display: none;
    }
  }
`;

export const NewIssueForm = styled.div<{ isActive: boolean }>`
  min-width: 268px; /* 갤럭시 폴드 width 280px 에서 마진 12px를 뺀 값 */
  width: 100%;

  form {
    position: relative;
    width: 100%;
    margin-bottom: 16px;
    border: ${({ isActive }) =>
      isActive
        ? css`1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE}`
        : css`1px solid ${({ theme }) => theme.COLORS.LINE}`};
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    margin: 12px;
  }
`;

export const NewIssueButtons = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-end' })};
  gap: 32px;
`;
