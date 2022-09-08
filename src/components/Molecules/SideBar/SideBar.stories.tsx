import { ComponentStory, ComponentMeta } from '@storybook/react';
import SideBar from '@/components/Molecules/SideBar';
import { SideBarItemType } from '@/components/Molecules/SideBar/types';

import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { labelHandlers } from '@/mocks/handlers/label';
import { authHandlers } from '@/mocks/handlers/auth';

import { DEFAULT_CONTENT_LIST, MOCK_CONTENT_LIST, SIDEBAR_PROPS } from '@/components/Molecules/SideBar/mock';

import useFetchSideBarData from '@/api/useFetchSideBarData';

export default {
  title: 'Molecules/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Content = () => {
  const { memberData, labelData, milestoneData } = useFetchSideBarData();

  const MOCK_SIDEBAR_PROPS: SideBarItemType[] = [
    {
      id: 'assignee',
      dropdownTitle: '담당자',
      dropdownListTitle: '담당자 필터',
      dropdownList: memberData!,
      dropdownType: 'checkbox',
    },
    {
      id: 'label',
      dropdownTitle: '레이블',
      dropdownListTitle: '레이블 필터',
      dropdownList: labelData!,
      dropdownType: 'checkbox',
    },
    {
      id: 'milestone',
      dropdownTitle: '마일스톤',
      dropdownListTitle: '마일스톤 필터',
      dropdownList: milestoneData!.openedMilestones,
      dropdownType: 'radio',
    },
  ];
  return (
    <div>
      <SideBar sideBarList={MOCK_SIDEBAR_PROPS} content={DEFAULT_CONTENT_LIST} />
    </div>
  );
};

const Template: ComponentStory<typeof Content> = () => <Content />;
const MockTemplate: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;

export const Initial = Template.bind({});
Initial.parameters = {
  msw: {
    handlers: [...milestoneHandlers, ...labelHandlers, ...authHandlers],
  },
};

export const Checked = MockTemplate.bind({});
Checked.args = {
  sideBarList: SIDEBAR_PROPS,
  content: MOCK_CONTENT_LIST,
};
