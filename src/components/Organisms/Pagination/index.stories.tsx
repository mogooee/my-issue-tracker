import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from '@/components/Organisms/Pagination';

export default {
  title: 'Organisms/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = () => <Pagination />;

export const Initial = Template.bind({});
