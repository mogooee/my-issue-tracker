import { Button } from '@/components/Atoms/Button/index.styles';
import { Form } from '@/components/Atoms/Input/index.styles';
import styled, { css } from 'styled-components';

export const FilterBarContainer = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};
  flex-direction: column;
  height: 82px;

  input {
    border-left: none;
  }
`;

export const FilterBar = styled.div<{ isActive: boolean }>`
  display: flex;

  ${Form} {
    width: 472px;
    height: inherit;
    padding: 6px 24px 6px 24px;
    border-radius: 0px 11px 11px 0px;
    border: 1px solid ${({ theme }) => theme.COLORS.LINE};
    border-left: none;
    background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
    color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
    }
    ${({ isActive }) =>
      isActive &&
      css`
        color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};

        background: ${({ theme }) => theme.COLORS.OFF_WHITE};
        border: 1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
      `}
  }
`;
