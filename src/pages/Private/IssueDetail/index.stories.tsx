import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Routes, Route } from 'react-router-dom';
import IssueDetail from '@/pages/Private/IssueDetail';
import Home from '@/pages/Home';

import { issueHandlers } from '@/mocks/handlers/issue';
import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { labelHandlers } from '@/mocks/handlers/label';
import { authHandlers } from '@/mocks/handlers/auth';

export default {
  title: 'pages (Private)/IssueDetail',
  component: IssueDetail,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/issues/:issueId" element={<Story />} />
        </Route>
      </Routes>
    ),
  ],
} as ComponentMeta<typeof IssueDetail>;

const Template: ComponentStory<typeof IssueDetail> = () => <IssueDetail />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...milestoneHandlers, ...labelHandlers, ...authHandlers, ...issueHandlers],
  },
};
