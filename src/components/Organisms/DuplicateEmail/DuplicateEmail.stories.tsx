import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Route, Routes } from 'react-router-dom';

import Login from '@/pages/Public/Login';
import DuplicateEmail from '@/components/Organisms/DuplicateEmail/DuplicateEmail';

export default {
  title: 'Organisms/DuplicateEmail',
  component: DuplicateEmail,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Story />} />
      </Routes>
    ),
  ],
} as ComponentMeta<typeof DuplicateEmail>;

const Template: ComponentStory<typeof DuplicateEmail> = (args) => <DuplicateEmail {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  provider: '이메일 가입하기',
  email: 'mogoo22@naver.com',
};
