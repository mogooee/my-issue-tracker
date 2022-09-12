import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Route, Routes } from 'react-router-dom';
import Milestones from '@/pages/Private/Milestones';
import Labels from '@/pages/Private/Labels';
import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { labelHandlers } from '@/mocks/handlers/label';

export default {
  title: 'Pages/Milestones',
  component: Milestones,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/labels" element={<Labels />} />
        <Route path="/milestones" element={<Story />} />
      </Routes>
    ),
  ],
} as ComponentMeta<typeof Milestones>;

const Template: ComponentStory<typeof Milestones> = () => <Milestones />;

export const Initial = Template.bind({});

Initial.parameters = {
  msw: {
    handlers: [...milestoneHandlers, ...labelHandlers],
  },
};
