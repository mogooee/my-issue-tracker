import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueHeader from '@/components/Organisms/IssueHeader';

export default {
  title: 'Organisms/IssueHeader',
  component: IssueHeader,
} as ComponentMeta<typeof IssueHeader>;

const Template: ComponentStory<typeof IssueHeader> = (args) => <IssueHeader {...args} />;

export const OpenIssue = Template.bind({});
OpenIssue.args = {
  id: 1,
  title: '로우앤슬로우',
  closed: false,
  createdAt: '2022-06-20T01:05:45.880Z',
  author: {
    id: 1,
    email: 'who.ho3ov@gmail.com',
    nickname: 'hoo',
    profileImage: 'https://avatars.githubusercontent.com/u/68011320?v=4',
  },
  commentNum: 5,
};

export const CloseIssue = Template.bind({});
CloseIssue.args = {
  ...OpenIssue.args,
  closed: true,
};
