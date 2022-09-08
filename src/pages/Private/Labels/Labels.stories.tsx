import { ComponentStory, ComponentMeta } from '@storybook/react';
import { labelHandlers } from '@/mocks/handlers/label';
import Labels from '@/pages/Private/Labels';

export default {
  title: 'pages/Labels',
  component: Labels,
} as ComponentMeta<typeof Labels>;

const Template: ComponentStory<typeof Labels> = () => <Labels />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: labelHandlers,
  },
};
