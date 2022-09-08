import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropdownIndicator from '@/components/Molecules/Dropdown/Indicator';
import { COLORS } from '@/styles/theme';
import Icon from '@/components/Atoms/Icon';

export default {
  title: 'Molecules/Dropdown/Indicator',
  component: DropdownIndicator,
} as ComponentMeta<typeof DropdownIndicator>;

const Template: ComponentStory<typeof DropdownIndicator> = (args) => <DropdownIndicator {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  indicatorStyle: 'STANDARD',
  indicatorLabel: 'Initial',
};

export const Filterbar = Template.bind({});
Filterbar.args = {
  indicatorStyle: 'FILTERBAR',
  indicatorLabel: '필터',
  isActive: false,
};

export const Sidebar = Template.bind({});
Sidebar.args = {
  indicatorStyle: 'SIDEBAR',
  indicatorLabel: '사이드 바',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  indicatorStyle: 'ICON',
  indicatorLabel: '',
  indicatorIcon: <Icon icon="Smile" stroke={COLORS.LABEL} />,
  isActive: false,
};
