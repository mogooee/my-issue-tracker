import { ComponentStory, ComponentMeta } from '@storybook/react';
import MilestoneTable from '@/components/Organisms/MilestoneTable';
import { milestoneHandlers } from '@/mocks/handlers/milestones';

export default {
  title: 'Organisms/MilestoneTable',
  component: MilestoneTable,
} as ComponentMeta<typeof MilestoneTable>;

const Template: ComponentStory<typeof MilestoneTable> = () => <MilestoneTable />;

export const Initial = Template.bind({});

Initial.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};
