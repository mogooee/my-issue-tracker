import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelTable from '@/components/Organisms/LabelTable';
import { labelHandlers } from '@/mocks/handler/label';

export default {
  title: 'Organisms/LabelTable',
  component: LabelTable,
} as ComponentMeta<typeof LabelTable>;

const Template: ComponentStory<typeof LabelTable> = () => <LabelTable />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: labelHandlers,
  },
};
