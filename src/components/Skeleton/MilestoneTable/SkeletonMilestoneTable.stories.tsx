import { ComponentStory, ComponentMeta } from '@storybook/react';
import SkeletonMilestoneTable from '@/components/Skeleton/MilestoneTable';

export default {
  title: 'Skeleton/MilestoneTable',
  component: SkeletonMilestoneTable,
} as ComponentMeta<typeof SkeletonMilestoneTable>;

const Template: ComponentStory<typeof SkeletonMilestoneTable> = () => <SkeletonMilestoneTable />;

export const Initial = Template.bind({});
