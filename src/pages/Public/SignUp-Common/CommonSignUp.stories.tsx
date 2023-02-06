import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Routes, Route } from 'react-router-dom';
import { authHandlers } from '@/mocks/handlers/auth';
import CommonSignUp from '@/pages/Public/SignUp-Common';

export default {
  title: 'pages (Public)/CommonSignUp',
  component: CommonSignUp,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/" element={<Story />} />
      </Routes>
    ),
  ],
} as ComponentMeta<typeof CommonSignUp>;

const Template: ComponentStory<typeof CommonSignUp> = () => <CommonSignUp />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...authHandlers],
  },
};
