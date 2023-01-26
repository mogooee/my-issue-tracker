import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '@/components/Molecules/Dropdown';
import {
  ASSIGNEE_DROPDOWN_ARGS,
  LABEL_BTNS_ARGS,
  REACTION_ARGS,
  SIDEBAR_ARGS,
  USER_LIST,
} from '@/components/Molecules/Dropdown/mock';
import styled from 'styled-components';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const DropdownTemplate = styled.div`
  menu {
    top: 25px;
    left: 0px;
  }
`;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <DropdownTemplate>
    <Dropdown {...args} />
  </DropdownTemplate>
);

export const Initial = Template.bind({});
Initial.args = ASSIGNEE_DROPDOWN_ARGS(USER_LIST);

export const Sidebar = Template.bind({});
Sidebar.args = SIDEBAR_ARGS;

export const Reaction = Template.bind({});
Reaction.args = REACTION_ARGS;

export const Bubble = Template.bind({});
const clickHandler = {
  editButton: () => {},
  deleteButton: () => {},
};
const BUBBLE_ARGS = LABEL_BTNS_ARGS(clickHandler);
Bubble.args = {
  ...BUBBLE_ARGS,
  panelProps: { ...BUBBLE_ARGS.panelProps, position: 'LEFT' },
};
