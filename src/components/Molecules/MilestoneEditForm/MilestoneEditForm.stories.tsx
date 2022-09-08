import { ComponentStory, ComponentMeta } from '@storybook/react';
import MilestoneEditForm from '@/components/Molecules/MilestoneEditForm';
import { milestoneHandlers } from '@/mocks/handlers/milestone';

export default {
  title: 'Molecules/MilestoneEditForm',
  component: MilestoneEditForm,
} as ComponentMeta<typeof MilestoneEditForm>;

const Template: ComponentStory<typeof MilestoneEditForm> = (args) => <MilestoneEditForm {...args} />;

export const ADD = Template.bind({});
ADD.args = {
  editMode: 'ADD',
};

ADD.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};

export const MODIFY = Template.bind({});
MODIFY.args = {
  editMode: 'MODIFY',
  milestoneInfo: {
    title: '편집할 마일스톤',
    description: '편집할 마일스톤에 대한 설명',
    dueDate: '2022-08-31',
  },
};

MODIFY.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};
