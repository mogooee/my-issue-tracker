import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from '@/components/Organisms/Header';
import { authHandlers } from '@/mocks/handlers/auth';

export default {
  title: 'Organisms/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  user: {
    id: 1,
    email: 'dobby@gmail.com',
    nickname: 'dobby',
    profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
  },
};
Initial.parameters = {
  msw: {
    handlers: authHandlers,
  },
};
