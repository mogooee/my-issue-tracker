import { useState } from 'react';
import useFetchSideBarData from '@/api/useFetchSideBarData';

import SideBar from '@/components/Organisms/SideBar';

import { ContentListTypes, isMilestoneTypes, UpdateSideBarFuncTypes } from '@/components/Organisms/SideBar/types';
import { filterUncheckedItem, getFindDropdownItem } from '@/components/Organisms/SideBar/utils';

const SideBarLogic = ({
  issueId,
  contentList: DEFAULT_CONTENT_LIST,
}: {
  issueId: number;
  contentList: ContentListTypes;
}) => {
  const [contentList, setContentList] = useState(DEFAULT_CONTENT_LIST);
  const { IssueSideBarModifyMutate } = useFetchSideBarData();

  const updateSideBarItemState = ({ ...props }: UpdateSideBarFuncTypes) => {
    // eslint-disable-next-line react/prop-types
    const { id, panel, checked, dropdownList } = props;

    const findDropdownItem = getFindDropdownItem({ id: id!, dropdownList });

    const contentKey = panel as keyof ContentListTypes;

    if (contentKey === 'milestone' && checked) {
      if (id !== 'no:milestone' && isMilestoneTypes(findDropdownItem!)) {
        setContentList({ ...contentList, [contentKey]: [findDropdownItem] });
        IssueSideBarModifyMutate({
          method: 'patch',
          issueId,
          category: contentKey,
          categoryId: findDropdownItem!.id,
        });
        return;
      }

      setContentList({ ...contentList, [contentKey]: [] });
      IssueSideBarModifyMutate({
        method: 'delete',
        issueId,
        category: contentKey,
        categoryId: contentList.milestone[0].id,
      });
      return;
    }

    if (contentKey !== 'milestone' && checked) {
      setContentList({ ...contentList, [contentKey]: [...contentList[contentKey], findDropdownItem] });
      IssueSideBarModifyMutate({
        method: 'post',
        issueId,
        category: `${contentKey}s`,
        categoryId: findDropdownItem!.id,
      });
      return;
    }

    if (contentKey !== 'milestone' && !checked) {
      const filterContentList = filterUncheckedItem({ id: id!, contentKey, contentList });
      setContentList({ ...contentList, [contentKey]: [...filterContentList] });
      IssueSideBarModifyMutate({
        method: 'delete',
        issueId,
        category: `${contentKey}s`,
        categoryId: findDropdownItem!.id,
      });
    }
  };

  return <SideBar content={contentList} handleOnChange={updateSideBarItemState} />;
};

export default SideBarLogic;
