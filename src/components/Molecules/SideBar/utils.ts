/* eslint-disable array-callback-return */
import {
  isAssignTypes,
  isLabelTypes,
  isMilestoneTypes,
  ContentListTypes,
  SideBarItemType,
} from '@/components/Molecules/SideBar/types';

import { LabelTypes, UserTypes, MilestoneTypes } from '@/api/issue/types';

export const getFindDropdownItem = ({
  id,
  dropdownList,
}: {
  id: string;
  dropdownList: (UserTypes | LabelTypes | MilestoneTypes)[];
}) =>
  dropdownList.find((el) => {
    if (isAssignTypes(el)) return el.nickname === id;
    if (isLabelTypes(el) || isMilestoneTypes(el)) return el.title === id;
  });

export const filterUncheckedItem = ({
  id,
  contentKey,
  contentList,
}: {
  id: string;
  contentKey: keyof ContentListTypes;
  contentList: ContentListTypes;
}) => {
  const contentItem: (UserTypes | LabelTypes | MilestoneTypes)[] = contentList[contentKey];

  return contentItem.filter((el) => {
    if (isAssignTypes(el)) return el.nickname !== id;
    if (isLabelTypes(el) || isMilestoneTypes(el)) return el.title !== id;
  });
};
