import { ComponentStory, ComponentMeta } from '@storybook/react';
import { issueHandlers } from '@/mocks/handlers/issue';
import { labelHandlers } from '@/mocks/handlers/label';
import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { authHandlers } from '@/mocks/handlers/auth';
import Routers from '@/router';

export default {
  title: '[🏠 Home]',
  component: Routers,
} as ComponentMeta<typeof Routers>;

const Template: ComponentStory<typeof Routers> = () => <Routers />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...issueHandlers, ...labelHandlers, ...milestoneHandlers, ...authHandlers],
  },
};
