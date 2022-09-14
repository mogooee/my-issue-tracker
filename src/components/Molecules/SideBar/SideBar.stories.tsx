import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SideBar from '@/components/Molecules/SideBar';
import { ContentListTypes, isMilestoneTypes, UpdateSideBarFuncTypes } from '@/components/Molecules/SideBar/types';
import { filterUncheckedItem, getFindDropdownItem } from '@/components/Molecules/SideBar/utils';

import { milestoneHandlers } from '@/mocks/handlers/milestone';
import { labelHandlers } from '@/mocks/handlers/label';
import { authHandlers } from '@/mocks/handlers/auth';

import { DEFAULT_CONTENT_LIST, MOCK_CONTENT_LIST } from '@/components/Molecules/SideBar/mock';

export default {
  title: 'Molecules/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

interface contentTypes {
  mockContentList: ContentListTypes;
}

const Content = ({ mockContentList }: contentTypes) => {
  const [contentList, setContentList] = useState(mockContentList);

  const handleOnChange = ({ ...props }: UpdateSideBarFuncTypes) => {
    // eslint-disable-next-line react/prop-types
    const { id, panel, checked, dropdownList } = props;

    const findDropdownItem = getFindDropdownItem({ id: id!, dropdownList });
    const contentKey = panel as keyof ContentListTypes;

    if (contentKey === 'milestone' && checked) {
      if (id !== 'none' && isMilestoneTypes(findDropdownItem!)) {
        return setContentList({ ...contentList, [contentKey]: [findDropdownItem] });
      }
      return setContentList({ ...contentList, [contentKey]: [] });
    }

    if (contentKey !== 'milestone' && checked) {
      return setContentList({ ...contentList, [contentKey]: [...contentList[contentKey], findDropdownItem] });
    }

    if (contentKey !== 'milestone' && !checked) {
      const filterContentList = filterUncheckedItem({ id: id!, contentKey, contentList });
      setContentList({ ...contentList, [contentKey]: [...filterContentList] });
    }
  };

  return <SideBar content={contentList} handleOnChange={handleOnChange} />;
};

const EmptyContentListTemplate: ComponentStory<typeof SideBar> = () => {
  const args = {
    mockContentList: DEFAULT_CONTENT_LIST,
  };
  return <Content {...args} />;
};

export const Initial = EmptyContentListTemplate.bind({});

Initial.parameters = {
  msw: {
    handlers: [...milestoneHandlers, ...labelHandlers, ...authHandlers],
  },
};

const MockContentListTemplate: ComponentStory<typeof SideBar> = () => {
  const args = {
    mockContentList: MOCK_CONTENT_LIST,
  };
  return <Content {...args} />;
};
export const Checked = MockContentListTemplate.bind({});
Checked.parameters = {
  msw: {
    handlers: [...milestoneHandlers, ...labelHandlers, ...authHandlers],
  },
};
