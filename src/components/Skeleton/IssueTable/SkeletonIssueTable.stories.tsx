import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonIssueTable from '@/components/Skeleton/IssueTable';

export default {
  title: 'Skeleton/IssueTable',
  component: SkeletonIssueTable,
} as ComponentMeta<typeof SkeletonIssueTable>;

const Template: ComponentStory<typeof SkeletonIssueTable> = () => <SkeletonIssueTable />;

export const Initial = Template.bind({});
