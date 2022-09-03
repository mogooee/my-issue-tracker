import { ComponentStory, ComponentMeta } from '@storybook/react';
import MilestoneItem from '@/components/Molecules/MilestoneItem';
import { milestoneHandlers } from '@/mocks/handlers/milestones';

export default {
  title: 'Molecules/MilestoneItem',
  component: MilestoneItem,
} as ComponentMeta<typeof MilestoneItem>;

const Template: ComponentStory<typeof MilestoneItem> = (args) => <MilestoneItem {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  id: 0,
  title: '마일스톤 1주차',
  description: '마일스톤 1주차에 대한 설명',
  closeCount: 3,
  openCount: 7,
  dueDate: '2022-08-26',
  closed: false,
};

Initial.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  id: 1,
  title: '타이틀만 있는 마일스톤',
  description: null,
  closeCount: 4,
  openCount: 18,
  dueDate: null,
  closed: false,
};

OnlyTitle.parameters = {
  msw: {
    handlers: milestoneHandlers,
  },
};
