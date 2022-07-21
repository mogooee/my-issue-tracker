import { ComponentStory, ComponentMeta } from '@storybook/react';
import OauthLoginForm from '@/components/Molecules/OauthLoginForm';

export default {
  title: 'Molecules/OauthLoginForm',
  component: OauthLoginForm,
} as ComponentMeta<typeof OauthLoginForm>;

export const Initial: ComponentStory<typeof OauthLoginForm> = () => <OauthLoginForm />;
