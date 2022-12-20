import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueTable from '@/components/Organisms/IssueTable';
import { issues } from '@/mocks/tables/issue';

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
  ...TotalIssue.args,
};

export const ClosedIssue = Template.bind({});
ClosedIssue.args = {
  ...TotalIssue.args,
};
