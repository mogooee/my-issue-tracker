import styled from 'styled-components';
import { CommonSignUpForm } from '../CommonSignUpForm/index.styles';

export const OauthSignUpForm = styled(CommonSignUpForm)`
  .email_form {
    margin-bottom: 12px;

    span {
      display: inline-block;
      margin: 10px 0 10px 10px;
      ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
    }

    .caption {
      margin: 10px 0px 10px 10px;
      ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
    }

    form {
      width: 100%;
    }
  }
`;
