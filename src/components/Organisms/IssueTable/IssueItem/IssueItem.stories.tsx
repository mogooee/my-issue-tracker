import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueItem from '@/components/Organisms/IssueTable/IssueItem';
import { issue } from '@/mocks/tables/issue';

export default {
  title: 'Molecules/IssueItem',
  component: IssueItem,
} as ComponentMeta<typeof IssueItem>;

const Template: ComponentStory<typeof IssueItem> = (args) => <IssueItem {...args} />;

export const Initial = Template.bind({});
Initial.args = issue;
