import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavLink from '@/components/Molecules/NavLink';
import Icon from '@/components/Atoms/Icon';

export default {
  title: 'Molecules/NavLink',
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

export const LINE = Template.bind({});
LINE.args = {
  navData: [
    { icon: <Icon icon="Tag" stroke="#14142B" />, title: '레이블 (3)', link: '/label' },
    { icon: <Icon icon="Milestone" fill="#14142B" />, title: '마일스톤 (2)', link: '/milestone' },
  ],
  navLinkStyle: 'LINE',
};
