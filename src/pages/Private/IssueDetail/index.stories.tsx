import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueDetail from '@/pages/Private/IssueDetail';
import { issueHandlers } from '@/mocks/handlers/issue';

export default {
  title: 'pages/IssueDetail',
  component: IssueDetail,
} as ComponentMeta<typeof IssueDetail>;

const Template: ComponentStory<typeof IssueDetail> = () => <IssueDetail />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: issueHandlers,
  },
};
