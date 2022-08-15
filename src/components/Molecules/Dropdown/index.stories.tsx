import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '@/components/Molecules/Dropdown';
import { UNUSED_OPTIONS, USER_LIST } from '@/components/Molecules/Dropdown/mocks';
import { ASSIGNEE_DROPDOWN_ARGS } from './mocks';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Initial = Template.bind({});
Initial.args = ASSIGNEE_DROPDOWN_ARGS;
