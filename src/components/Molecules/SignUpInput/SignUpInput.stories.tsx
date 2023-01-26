import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignUpInput from '@/components/Molecules/SignUpInput';
import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';

export default {
  title: 'Molecules/SignUpInput',
  component: SignUpInput,
} as ComponentMeta<typeof SignUpInput>;

const Template: ComponentStory<typeof SignUpInput> = (args) => <SignUpInput {...args} />;

export const id = Template.bind({});
id.args = FORM_INFO.find((e) => e.id === 'id');

export const password = Template.bind({});
password.args = FORM_INFO.find((e) => e.id === 'password');

export const email = Template.bind({});
email.args = FORM_INFO.find((e) => e.id === 'email');

export const nickname = Template.bind({});
nickname.args = FORM_INFO.find((e) => e.id === 'nickname');
