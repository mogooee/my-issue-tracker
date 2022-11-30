import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from '@/components/Organisms/Pagination';

export default {
  title: 'Organisms/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  totalPages: 20,
  currentPage: 0,
};

export const Center = Template.bind({});
Center.args = {
  totalPages: 20,
  currentPage: 11,
};

export const Tail = Template.bind({});
Tail.args = {
  totalPages: 20,
  currentPage: 19,
};
