import { COLORS } from '@/styles/theme';
import styled, { keyframes } from 'styled-components';

const skeletonGradient = keyframes`
  0% {
    background: ${COLORS.BACKGROUND};
  }
  50% {
    background: ${COLORS.LINE};
  }
  100% {
    background: ${COLORS.BACKGROUND};
  }
  `;

export const LabelTable = styled.div`
  width: 1280px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  overflow: hidden;
  & > div {
    div {
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
    }
  }
`;

export const LabelTableHeader = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  align-items: center;
  justify-items: center;
  width: 1280px;
  height: 64px;
  background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
`;

export const LabelTableTitle = styled.div`
  width: 120px;
  height: 28px;
  background: ${({ theme }) => theme.COLORS.LINE};
`;

export const LabelItem = styled.div`
  display: grid;
  grid-template-columns: 240px auto 240px;
  align-items: center;
  justify-items: center;
  width: 1280px;
  height: 100px;
  background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
  border-top: 1px solid ${({ theme }) => theme.COLORS.LINE};
`;

export const Label = styled.div`
  width: 120px;
  height: 28px;
`;

export const Description = styled.div`
  width: 800px;
  height: 28px;
`;

export const ButtonTabs = styled.div`
  display: flex;
  div + div {
    margin-left: 24px;
  }
`;

export const EditButton = styled.div`
  width: 43px;
  height: 32px;
`;

export const DelteButton = styled.div`
  width: 43px;
  height: 32px;
`;
