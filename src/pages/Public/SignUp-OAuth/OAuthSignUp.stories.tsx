import { ComponentStory, ComponentMeta } from '@storybook/react';
import { authHandlers } from '@/mocks/handlers/auth';
import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

import * as S from '@/pages/Public/SignUp-OAuth/index.styles';

// OAuthSignUp 컴포넌트를 불러오게 되면 내부 로직땜에 오류가 발생하여 OAuthSignUpForm 컴포넌트로 대체함
export default {
  title: 'pages (Public)/OAuthSignUp',
  component: OAuthSignUpForm,
} as ComponentMeta<typeof OAuthSignUpForm>;

const Template: ComponentStory<typeof OAuthSignUpForm> = () => {
  const authData = {
    resourceOwnerId: '123123',
    email: 'test@example.com',
    profileImage: '',
  };

  return (
    <S.OAuthSignUp>
      <OAuthSignUpForm SignUpFormData={authData} />
    </S.OAuthSignUp>
  );
};

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...authHandlers],
  },
};
