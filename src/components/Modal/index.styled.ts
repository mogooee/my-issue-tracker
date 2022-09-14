import styled from 'styled-components';

export const BackGround = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
`;

export const ModalBlock = styled.div`
  height: max-content;
  padding: 40px;
  position: absolute;
  border-radius: 20px;
  background: #fff;
`;

export const ModalTitle = styled.h1`
  ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
  margin-bottom: 4px;
`;

export const ModalComment = styled.p`
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
  margin-bottom: 12px;
`;

export const ModalCaption = styled.p`
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  margin-bottom: 12px;
`;

export const ModalAlertButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;

  button:first-child {
    background: ${({ theme }) => theme.COLORS.LINE};
    color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};

    &:hover:not([disabled]) {
      background: ${({ theme }) => theme.COLORS.PLACEHOLDER};
    }
  }

  button:last-child {
    background: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
  }
`;
