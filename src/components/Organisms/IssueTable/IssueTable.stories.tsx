import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueTable from '@/components/Organisms/IssueTable';
import { LABEL_LIST } from '@/components/Molecules/Dropdown/mock';
import { issues } from '@/mocks/tables/issue';
import { milestones } from '@/mocks/handlers/milestone';

export default {
  title: 'Organisms/IssueTable',
  component: IssueTable,
} as ComponentMeta<typeof IssueTable>;

const Template: ComponentStory<typeof IssueTable> = (args) => <IssueTable {...args} />;

export const TotalIssue = Template.bind({});
TotalIssue.args = {
  issuesData: issues,
  labelData: LABEL_LIST,
  milestoneData: milestones,
};

export const OpenIssue = Template.bind({});
OpenIssue.args = {
  ...TotalIssue.args,
};

export const ClosedIssue = Template.bind({});
ClosedIssue.args = {
  ...TotalIssue.args,
};
