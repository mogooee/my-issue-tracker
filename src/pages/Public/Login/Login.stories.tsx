import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Routes, Route } from 'react-router-dom';
import { authHandlers } from '@/mocks/handlers/auth';
import Login from '@/pages/Public/Login';
import CommonSignUp from '@/pages/Public/SignUp-Common';

export default {
  title: 'pages (Public)/Login',
  component: Login,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/signup" element={<CommonSignUp />} />
      </Routes>
    ),
  ],
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => <Login />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...authHandlers],
  },
};
