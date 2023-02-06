import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import IssueDetail from '@/pages/Private/IssueDetail';
import Labels from '@/pages/Private/Labels';
import Issues from '@/pages/Private/Issues';
import Milestones from '@/pages/Private/Milestones';

import { issueHandlers } from '@/mocks/handlers/issue';
import { labelHandlers } from '@/mocks/handlers/label';
import { milestoneHandlers } from '@/mocks/handlers/milestone';

export default {
  title: 'pages (Private)/Issues',
  component: Issues,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Story />} />
          <Route path="/issues/:issueId" element={<IssueDetail />} />
          <Route path="/labels" element={<Labels />} />
          <Route path="/milestones" element={<Milestones />} />
        </Route>
      </Routes>
    ),
  ],
} as ComponentMeta<typeof Issues>;

const Template: ComponentStory<typeof Issues> = () => <Issues />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...issueHandlers, ...labelHandlers, ...milestoneHandlers],
  },
};
