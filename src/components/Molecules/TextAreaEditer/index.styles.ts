import DEFAULT_MARKDOWN from '@/styles/markdown';
import styled, { css } from 'styled-components';

export const Editer = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  background: white;
`;

export const EditerNavButtons = styled.div<{ editerMode: 'Write' | 'Preview' }>`
  margin-bottom: -1px;
  padding: 16px 16px 0 16px;
  border-radius: 16px 16px 0 0;
  background: ${({ theme }) => theme.COLORS.BACKGROUND};

  button {
    border: none;
    padding: 8px 16px;
    background: transparent;
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL}
  }

  .write_button {
    margin-right: 4px;

    ${({ editerMode }) =>
      editerMode === 'Write' &&
      css`
        border-radius: 4px 4px 0 0;
        border: 1px solid ${({ theme }) => theme.COLORS.LINE};
        border-bottom: 1px solid white;
        background: white;
      `}
  }

  .preview_button {
    ${({ editerMode }) =>
      editerMode === 'Preview' &&
      css`
        border-radius: 4px 4px 0 0;
        border: 1px solid ${({ theme }) => theme.COLORS.LINE};
        border-bottom: 1px solid white;
        background: white;
      `}
  }
`;

export const EditerTextAreaWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.COLORS.LINE};
  padding: 8px;

  .markdown {
    padding: 0 8px;
    font-size: 100%;
    ${DEFAULT_MARKDOWN}
  }
`;
