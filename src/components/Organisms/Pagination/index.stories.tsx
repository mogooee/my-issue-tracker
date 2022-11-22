import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from '@/components/Organisms/Pagination';
import { issues } from '@/mocks/tables/issue';

export default {
  title: 'Organisms/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = () => <Pagination issuesData={issues.issues} />;

export const Initial = Template.bind({});
