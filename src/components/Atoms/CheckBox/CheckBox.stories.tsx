import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckBox from '@/components/Atoms/CheckBox/';

export default {
  title: 'Atoms/Checkbox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

const checkedIssue: string[] = [];

const checkedItemHandler = (id: string, isChecked: boolean) => {
  // eslint-disable-next-line no-unused-expressions
  isChecked ? checkedIssue.push(id) : checkedIssue.pop();
};

export const Checkebox = Template.bind({});
Checkebox.args = {
  id: 0,
  checkedItemHandler,
  checkedIssue,
};
