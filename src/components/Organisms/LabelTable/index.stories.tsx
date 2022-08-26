import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelTable from '@/components/Organisms/LabelTable';
import { labelContents } from '@/components/Molecules/Table/mock';

export default {
  title: 'Organisms/LabelTable',
  component: LabelTable,
} as ComponentMeta<typeof LabelTable>;

const Template: ComponentStory<typeof LabelTable> = (args) => <LabelTable {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  labelContents,
};
