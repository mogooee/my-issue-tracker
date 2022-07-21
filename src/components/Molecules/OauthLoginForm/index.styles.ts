import styled from 'styled-components';

export const OauthLoginForm = styled.div`
  width: 100%;

  p {
    margin: 24px 0 16px 0;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
    ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
  }

  .Oauth_Btns {
    ${({ theme }) => theme.MIXIN.FLEX({ align: 'flex-start', justify: 'center' })};

    a {
      margin: 0 8px;
    }
  }
`;
