import styled from 'styled-components';
import { Form } from '@/components/Atoms/Input/index.styles';

export const LoginForm = styled.div`
  ${Form} {
    width: 100%;
  }

  form + form {
    margin: 16px 0 24px 0;
  }

  button {
    width: 100%;
  }
`;

export const FailMessage = styled.span`
  color: ${({ theme }) => theme.COLORS.ERROR.RED};
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  display: block;
  text-align: center;
  padding-bottom: 24px;
`;
