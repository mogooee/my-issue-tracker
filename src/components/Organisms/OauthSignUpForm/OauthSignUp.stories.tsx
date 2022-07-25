import { ComponentStory, ComponentMeta } from '@storybook/react';
import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm/';

export default {
  title: 'Organisms/OAuthSignUpForm',
  component: OAuthSignUpForm,
} as ComponentMeta<typeof OAuthSignUpForm>;

const Template: ComponentStory<typeof OAuthSignUpForm> = (args) => <OAuthSignUpForm {...args} />;

const authData = {
  authData: {
    email: '도톨비@gmail.com',
  },
};

export const Initial = Template.bind({});
Initial.args = authData;
