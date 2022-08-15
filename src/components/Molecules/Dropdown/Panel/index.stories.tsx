import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropdownPanel from '@/components/Molecules/Dropdown/Panel';
import { ISSUE_FILTER_LIST, LABEL_LIST, UNUSED_OPTIONS, USER_LIST } from '@/components/Molecules/Dropdown/mocks';

export default {
  title: 'Molecules/Dropdown/Panel',
  component: DropdownPanel,
} as ComponentMeta<typeof DropdownPanel>;

const Template: ComponentStory<typeof DropdownPanel> = (args) => <DropdownPanel {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  panelTitle: '체크박스 필터 (라벨x)',
  panelType: 'checkbox',
  panelList: ISSUE_FILTER_LIST,
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  panelTitle: '체크박스 필터 (라벨o)',
  panelType: 'checkbox',
  panelList: LABEL_LIST,
  unusedOption: UNUSED_OPTIONS.LABEL,
};

export const Radio = Template.bind({});
Radio.args = {
  panelTitle: '라디오 필터',
  panelType: 'radio',
  panelList: USER_LIST,
  unusedOption: UNUSED_OPTIONS.ASSIGNEE,
};
