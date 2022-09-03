import { ComponentStory, ComponentMeta } from '@storybook/react';
import { milestoneHandlers } from '@/mocks/handlers/milestones';
import Milestones from '.';

export default {
  title: 'Pages/Milestones',
  component: Milestones,
} as ComponentMeta<typeof Milestones>;

const Template: ComponentStory<typeof Milestones> = () => <Milestones />;

export const Initial = Template.bind({});

Initial.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};
