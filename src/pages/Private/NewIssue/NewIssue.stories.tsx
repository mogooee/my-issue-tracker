import { ComponentStory, ComponentMeta } from '@storybook/react';
import NewIssue from '@/pages/Private/NewIssue';

export default {
  title: 'pages/NewIssue',
  component: NewIssue,
} as ComponentMeta<typeof NewIssue>;

const Template: ComponentStory<typeof NewIssue> = () => <NewIssue />;

export const Initial = Template.bind({});
