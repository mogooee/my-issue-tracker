import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

import styled from 'styled-components';

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

const OAuthSignUp = () => {
  const authData = {
    email: '도톨비@gmail.com',
  };

  return (
    <StyledDiv>
      <OAuthSignUpForm authData={authData} />
    </StyledDiv>
  );
};

export default OAuthSignUp;
