import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import CommonSignUpForm from '@/components/Organisms/CommonSignUpForm';

export default {
  title: 'Organisms/CommonSignUpForm',
  component: CommonSignUpForm,
} as ComponentMeta<typeof CommonSignUpForm>;

const Template: ComponentStory<typeof CommonSignUpForm> = (args) => <CommonSignUpForm {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  FORM_INFO,
};
