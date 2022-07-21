import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommonLoginForm from '@/components/Molecules/CommonLoginForm';

export default {
  title: 'Molecules/CommonLoginForm',
  component: CommonLoginForm,
} as ComponentMeta<typeof CommonLoginForm>;

export const Initial: ComponentStory<typeof CommonLoginForm> = () => <CommonLoginForm />;
