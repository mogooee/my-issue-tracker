import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueTable from '@/components/Organisms/IssueTable';
import { issueListData } from '@/components/Organisms/IssueTable/mocks';
import { FILTER_TABS_INFO } from '@/components/Molecules/Dropdown/mocks';

export default {
  title: 'Organisms/IssueTable',
  component: IssueTable,
} as ComponentMeta<typeof IssueTable>;

const Template: ComponentStory<typeof IssueTable> = (args) => <IssueTable {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  issueListData,
  filterTabs: FILTER_TABS_INFO,
};
