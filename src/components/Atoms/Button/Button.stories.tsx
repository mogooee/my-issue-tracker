import { ComponentStory, ComponentMeta } from '@storybook/react';
import { COLORS } from '@/styles/theme';
import Button from '@/components/Atoms/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  disabled: false,
  label: 'BUTTON',
  size: 'LARGE',
  buttonStyle: 'STANDARD',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Initial.args,
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Initial.args,
  disabled: true,
  size: 'MEDIUM',
  iconInfo: {
    icon: 'Milestone',
    stroke: COLORS.OFF_WHITE,
    fill: COLORS.OFF_WHITE,
  },
};

export const SmallSecondary = Template.bind({});
SmallSecondary.args = {
  ...Initial.args,
  size: 'SMALL',
  buttonStyle: 'SECONDARY',
  iconInfo: {
    icon: 'Plus',
  },
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  ...Initial.args,
  size: 'SMALL',
  buttonStyle: 'NO_BORDER',
  iconInfo: {
    icon: 'Plus',
  },
};
