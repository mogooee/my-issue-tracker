import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelTable from '@/components/Skeleton/LabelTable';

export default {
  title: 'Skeleton/LabelTable',
  component: LabelTable,
} as ComponentMeta<typeof LabelTable>;

const Template: ComponentStory<typeof LabelTable> = () => <LabelTable />;

export const Initial = Template.bind({});
