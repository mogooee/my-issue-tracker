import { ComponentStory, ComponentMeta } from '@storybook/react';
import { milestoneHandlers } from '@/mocks/handlers/milestones';
import ErrorMilestoneTable from '@/components/Organisms/MilestoneTable/Error';

export default {
  title: 'Organisms/MilestoneTable/Error',
  component: ErrorMilestoneTable,
} as ComponentMeta<typeof ErrorMilestoneTable>;

const Template: ComponentStory<typeof ErrorMilestoneTable> = (args) => <ErrorMilestoneTable {...args} />;

export const Initial = Template.bind({});

Initial.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};
