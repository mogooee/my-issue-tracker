import { ComponentStory, ComponentMeta } from '@storybook/react';
import Label from '@/components/Atoms/Label';
import Icon from '@/components/Atoms/Icon';

export default {
  title: 'Atoms/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  title: '레이블',
  labelStyle: 'LIGHT',
};

export const Light = Template.bind({});
Light.args = {
  title: '레이블',
  labelStyle: 'LIGHT',
  backgroundColor: '#F85149',
};

export const Dark = Template.bind({});
Dark.args = {
  title: '레이블',
  labelStyle: 'DARK',
  backgroundColor: '#F85149',
};

export const withIcon = Template.bind({
  backgrounds: 'black',
});
withIcon.args = {
  ...Initial.args,
  icon: <Icon icon="Smile" stroke="#fff" />,
};
