import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavLink from '@/components/Molecules/NavLink';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

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

export const WithIcon = Template.bind({});
WithIcon.args = {
  navData: [
    { icon: <Icon icon="Search" stroke={COLORS.TITLE_ACTIVE} />, title: 'tab1', link: '/tab1' },
    { icon: <Icon icon="RefreshCcw" stroke={COLORS.TITLE_ACTIVE} />, title: 'tab2', link: '/tab2' },
  ],
};

export const LINE = Template.bind({});
LINE.args = {
  navData: [
    { icon: <Icon icon="Tag" stroke={COLORS.TITLE_ACTIVE} />, title: '레이블 (3)', link: '/labels' },
    { icon: <Icon icon="Milestone" fill={COLORS.TITLE_ACTIVE} />, title: '마일스톤 (2)', link: '/milestones' },
  ],
  navLinkStyle: 'LINE',
};
