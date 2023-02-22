import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Labels from '@/pages/Private/Labels';
import Milestones from '@/pages/Private/Milestones';
import { labelHandlers } from '@/mocks/handlers/label';
import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { issueHandlers } from '@/mocks/handlers/issue';

export default {
  title: 'pages (Private)/Labels',
  component: Labels,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/labels" element={<Story />} />
          <Route path="/milestones" element={<Milestones />} />
        </Route>
      </Routes>
    ),
  ],
} as ComponentMeta<typeof Labels>;

const Template: ComponentStory<typeof Labels> = () => <Labels />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...issueHandlers, ...labelHandlers, ...milestoneHandlers],
  },
};
