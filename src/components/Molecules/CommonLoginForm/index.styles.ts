import styled, { css } from 'styled-components';
import { Input } from '@/components/Atoms/Input/index.styles';
import { InputTypes } from '@/components/Atoms/Input';

export const LoginForm = styled.form`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column' })};
  flex-wrap: wrap;

  label + label {
    margin: 16px 0 24px 0;
  }

  button {
    width: 100%;
  }
`;

type LabelStyleTypes = Pick<InputTypes, 'isActive' | 'isTyping'>;

export const LoginLabel = styled.label<LabelStyleTypes>`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'flex-start', justify: 'flex-start' })};
  color: ${({ theme }) => theme.COLORS.LABEL};
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};

  border: none;
  border-radius: 16px;
  background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
  padding: 0 24px;
  ${({ theme }) => theme.TEXT_INPUT_SIZE.LARGE};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
      background: ${({ theme }) => theme.COLORS.OFF_WHITE};
      border: 1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE};

      label {
        color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
      }
    `}

  &:focus {
    color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
    background: ${({ theme }) => theme.COLORS.OFF_WHITE};
    outline: 1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
  }
`;

export const LoginInput = styled(Input)`
  width: 100%;
  background: transparent;
  border: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
  }

  &:focus {
    outline: none;
  }
`;

export const FailMessage = styled.span`
  color: ${({ theme }) => theme.COLORS.ERROR.RED};
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  display: block;
  text-align: center;
  padding-bottom: 24px;
`;
