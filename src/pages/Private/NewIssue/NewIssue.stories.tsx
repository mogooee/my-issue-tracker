import { ComponentStory, ComponentMeta } from '@storybook/react';
import NewIssue from '@/pages/Private/NewIssue';
import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { labelHandlers } from '@/mocks/handlers/label';
import { authHandlers } from '@/mocks/handlers/auth';
import { issueHandlers } from '@/mocks/handlers/issue';

export default {
  title: 'pages/NewIssue',
  component: NewIssue,
} as ComponentMeta<typeof NewIssue>;

const Template: ComponentStory<typeof NewIssue> = () => <NewIssue />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...milestoneHandlers, ...labelHandlers, ...authHandlers, ...issueHandlers],
  },
};
