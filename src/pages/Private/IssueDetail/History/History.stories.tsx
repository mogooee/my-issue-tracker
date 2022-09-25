import { ComponentStory, ComponentMeta } from '@storybook/react';

import { issue } from '@/mocks/tables/issue';
import IssueHistory from '@/pages/Private/IssueDetail/History';

export default {
  title: 'pages/IssueDetail/IssueHistory',
  component: IssueHistory,
} as ComponentMeta<typeof IssueHistory>;

const Template: ComponentStory<typeof IssueHistory> = (args) => <IssueHistory {...args} />;

export const Initial = Template.bind({});
// eslint-disable-next-line prefer-destructuring
Initial.args = issue.issueHistories[3];
