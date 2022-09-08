import { ComponentStory, ComponentMeta } from '@storybook/react';
import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm/';
import { SignUpFormDataTypes } from '@/api/sign';

export default {
  title: 'Organisms/OAuthSignUpForm',
  component: OAuthSignUpForm,
} as ComponentMeta<typeof OAuthSignUpForm>;

const Template: ComponentStory<typeof OAuthSignUpForm> = (args) => <OAuthSignUpForm {...args} />;

const signUpFormData: SignUpFormDataTypes = {
  resourceOwnerId: 'string',
  email: 'dobby@gmail.com',
  profileImage: 'string',
};

export const Initial = Template.bind({});
Initial.args = {
  SignUpFormData: signUpFormData,
};
