import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueTable from '@/components/Organisms/IssueTable';
import {
  ASSIGNEE_DROPDOWN_ARGS,
  AUTHOR_DROPDOWN_ARGS,
  LABEL_DROPDOWN_ARGS,
  LABEL_LIST,
  MILESTONE_DROPDOWN_ARGS,
  MILESTONE_LIST,
  USER_LIST,
} from '@/components/Molecules/Dropdown/mock';
import { issues } from '@/mocks/tables/issue';

export default {
  title: 'Organisms/IssueTable',
  component: IssueTable,
} as ComponentMeta<typeof IssueTable>;

const Template: ComponentStory<typeof IssueTable> = (args) => <IssueTable {...args} />;

export const TotalIssue = Template.bind({});
TotalIssue.args = {
  issuesData: issues,
  filterTabs: [
    ASSIGNEE_DROPDOWN_ARGS(USER_LIST),
    LABEL_DROPDOWN_ARGS(LABEL_LIST),
    MILESTONE_DROPDOWN_ARGS(MILESTONE_LIST),
    AUTHOR_DROPDOWN_ARGS(USER_LIST),
  ],
};

export const OpenIssue = Template.bind({});
OpenIssue.args = {
  ...TotalIssue.args,
};

export const ClosedIssue = Template.bind({});
ClosedIssue.args = {
  ...TotalIssue.args,
};
