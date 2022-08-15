import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckBox from '@/components/Atoms/CheckBox/';

export default {
  title: 'Atoms/Checkbox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  id: 0,
};

export const Checked = Template.bind({});
Checked.args = {
  ...Initial.args,
  checked: true,
};
