import { ComponentStory, ComponentMeta } from '@storybook/react';
import { labelHandlers } from '@/mocks/handler/label';
import LabelList from '@/pages/Private/LabelList';

export default {
  title: 'pages/LabelList',
  component: LabelList,
} as ComponentMeta<typeof LabelList>;

const Template: ComponentStory<typeof LabelList> = () => <LabelList />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: labelHandlers,
  },
};
