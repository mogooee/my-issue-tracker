import { ComponentStory, ComponentMeta } from '@storybook/react';
import { milestoneHandlers } from '@/mocks/handlers/milestones';
import { labelHandlers } from '@/mocks/handlers/label';
import ErrorTable from '@/components/Organisms/ErrorTable';

export default {
  title: 'Organisms/ErrorTable',
  component: ErrorTable,
} as ComponentMeta<typeof ErrorTable>;

const Template: ComponentStory<typeof ErrorTable> = (args) => <ErrorTable {...args} />;

export const MilestoneTable = Template.bind({});
MilestoneTable.args = {
  type: 'milestone',
};

MilestoneTable.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};

export const LableTable = Template.bind({});
LableTable.args = {
  type: 'label',
};

LableTable.parameters = {
  msw: {
    handlers: labelHandlers,
  },
};
