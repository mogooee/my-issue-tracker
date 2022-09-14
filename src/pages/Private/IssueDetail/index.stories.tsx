import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Routes, Route } from 'react-router-dom';
import IssueDetail from '@/pages/Private/IssueDetail';
import { issueHandlers } from '@/mocks/handlers/issue';

export default {
  title: 'pages/IssueDetail',
  component: IssueDetail,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/issues/:issueId" element={<Story />} />
      </Routes>
    ),
  ],
} as ComponentMeta<typeof IssueDetail>;

const Template: ComponentStory<typeof IssueDetail> = () => <IssueDetail />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: issueHandlers,
  },
};
