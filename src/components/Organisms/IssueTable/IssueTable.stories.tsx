import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueTable from '@/components/Organisms/IssueTable';
import { FILTER_TABS_INFO } from '@/components/Molecules/Dropdown/mock';
import { issues } from '@/mocks/tables/issue';

export default {
  title: 'Organisms/IssueTable',
  component: IssueTable,
} as ComponentMeta<typeof IssueTable>;

const Template: ComponentStory<typeof IssueTable> = (args) => <IssueTable {...args} />;

export const TotalIssue = Template.bind({});
TotalIssue.args = {
  issues,
  filterTabs: FILTER_TABS_INFO,
  issueState: 'ALL',
};

export const OpenIssue = Template.bind({});
OpenIssue.args = {
  ...TotalIssue.args,
  issueState: 'OPEN',
};

export const ClosedIssue = Template.bind({});
ClosedIssue.args = {
  ...TotalIssue.args,
  issueState: 'CLOSED',
};
