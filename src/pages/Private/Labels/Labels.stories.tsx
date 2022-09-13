import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Route, Routes } from 'react-router-dom';
import Labels from '@/pages/Private/Labels';
import Milestones from '@/pages/Private/Milestones';
import { labelHandlers } from '@/mocks/handlers/label';
import { milestoneHandlers } from '@/mocks/handlers/milestone';

export default {
  title: 'pages/Labels',
  component: Labels,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/labels" element={<Story />} />
        <Route path="/milestones" element={<Milestones />} />
      </Routes>
    ),
  ],
} as ComponentMeta<typeof Labels>;

const Template: ComponentStory<typeof Labels> = () => <Labels />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...labelHandlers, ...milestoneHandlers],
  },
};