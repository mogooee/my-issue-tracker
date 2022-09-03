import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

export default {
  title: 'Atoms/Icons',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const AlertCircle = Template.bind({});
AlertCircle.args = {
  icon: 'AlertCircle',
  stroke: COLORS.PRIMARY.BLUE,
  fill: COLORS.PRIMARY.LIGHT_BLUE,
};

export const Archive = Template.bind({});
Archive.args = {
  icon: 'Archive',
  stroke: COLORS.SECONDORY.PURPLE,
  fill: COLORS.SECONDORY.LIGHT_PURPLE,
};

export const Calendar = Template.bind({});
Calendar.args = {
  icon: 'Calendar',
  stroke: COLORS.PRIMARY.BLUE,
  fill: COLORS.PRIMARY.LIGHT_BLUE,
};

export const Edit = Template.bind({});
Edit.args = {
  icon: 'Edit',
  stroke: COLORS.SECONDORY.PURPLE,
};

export const Milestone = Template.bind({});
Milestone.args = {
  icon: 'Milestone',
  fill: COLORS.SECONDORY.PURPLE,
};

export const Plus = Template.bind({});
Plus.args = {
  icon: 'Plus',
  stroke: COLORS.TITLE_ACTIVE,
};

export const RefreshCcw = Template.bind({});
RefreshCcw.args = {
  icon: 'RefreshCcw',
  stroke: COLORS.TITLE_ACTIVE,
};

export const Search = Template.bind({});
Search.args = {
  icon: 'Search',
  stroke: COLORS.TITLE_ACTIVE,
};

export const Smile = Template.bind({});
Smile.args = {
  icon: 'Smile',
  stroke: COLORS.SUCCESS.GREEN,
};

export const Tag = Template.bind({});
Tag.args = {
  icon: 'Tag',
  stroke: COLORS.LABEL,
};

export const Trash = Template.bind({});
Trash.args = {
  icon: 'Trash',
  stroke: COLORS.LABEL,
};

export const XSquare = Template.bind({});
XSquare.args = {
  icon: 'XSquare',
  stroke: COLORS.LABEL,
};

export const Menu = Template.bind({});
Menu.args = {
  icon: 'Menu',
  stroke: COLORS.LABEL,
};
