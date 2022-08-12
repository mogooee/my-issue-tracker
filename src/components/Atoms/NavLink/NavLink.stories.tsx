import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavLink from '@/components/Atoms/NavLink';
import Icon from '../Icon';

export default {
  title: 'Atoms/NavLink',
  component: NavLink,
} as ComponentMeta<typeof NavLink>;

const Template: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  navData: [
    { title: 'tab1', link: '/tab1' },
    { title: 'tab2', link: '/tab2' },
  ],
};

export const withIcon = Template.bind({});
withIcon.args = {
  navData: [
    { icon: <Icon icon="Search" stroke="#14142B" />, title: 'tab1', link: '/tab1' },
    { icon: <Icon icon="RefreshCcw" stroke="#14142B" />, title: 'tab2', link: '/tab2' },
  ],
};
