import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueTable from '@/components/Organisms/IssueTable';
import { issues, issueTable } from '@/mocks/tables/issue';

export default {
  title: 'Organisms/IssueTable',
  component: IssueTable,
} as ComponentMeta<typeof IssueTable>;

const Template: ComponentStory<typeof IssueTable> = (args) => <IssueTable {...args} />;

export const TotalIssue = Template.bind({});
TotalIssue.args = {
  issuesData: issues,
};

export const OpenIssue = Template.bind({});
OpenIssue.args = {
  issuesData: {
    ...issues,
    issues: { ...issues.issues, content: [...issues.issues.content.filter((issue) => !issue.closed)] },
  },
};

export const ClosedIssue = Template.bind({});
ClosedIssue.args = {
  issuesData: {
    ...issues,
    issues: { ...issues.issues, content: [...issues.issues.content.filter((issue) => issue.closed)] },
  },
};
