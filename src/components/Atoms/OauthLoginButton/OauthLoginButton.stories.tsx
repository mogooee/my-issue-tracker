import { ComponentStory, ComponentMeta } from '@storybook/react';
import OauthLoginButton from '@/components/Atoms/OauthLoginButton';

export default {
  title: 'Atoms/OauthLoginButton',
  component: OauthLoginButton,
} as ComponentMeta<typeof OauthLoginButton>;

const Template: ComponentStory<typeof OauthLoginButton> = (args) => <OauthLoginButton {...args} />;

export const Github = Template.bind({});
Github.args = {
  type: 'Github',
};

export const Naver = Template.bind({});
Naver.args = {
  type: 'Naver',
};

export const Kakao = Template.bind({});
Kakao.args = {
  type: 'Kakao',
};
