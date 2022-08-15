import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropdownIndicator from '@/components/Molecules/Dropdown/Indicator';

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
