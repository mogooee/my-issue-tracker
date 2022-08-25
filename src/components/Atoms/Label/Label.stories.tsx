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
  textColor: 'BLACK',
};

export const Light = Template.bind({});
Light.args = {
  ...Initial.args,
  backgroundColor: '#F85149',
  textColor: 'BLACK',
};

export const Dark = Template.bind({});
Dark.args = {
  title: '레이블',
  labelStyle: 'DARK',
  backgroundColor: '#F85149',
  textColor: 'WHITE',
};

export const WithIcon = Template.bind({
  backgrounds: 'black',
});
WithIcon.args = {
  ...Initial.args,
  icon: <Icon icon="Smile" stroke="#fff" />,
};
