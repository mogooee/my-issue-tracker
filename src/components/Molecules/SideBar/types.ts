import { LabelTypes, UserTypes, MilestoneTypes } from '@/api/issue/types';

export interface ContentListTypes {
  assignee: UserTypes[];
  label: LabelTypes[];
  milestone: MilestoneTypes[];
}

export interface ContentItemTypes {
  content: UserTypes[] | LabelTypes[] | MilestoneTypes[];
  handleOnChange: (target: HTMLInputElement) => void;
}

export interface SideBarItemType {
  id: keyof ContentListTypes;
  dropdownTitle: string;
  dropdownListTitle: string;
  dropdownList: UserTypes[] | LabelTypes[] | MilestoneTypes[];
  dropdownType: 'checkbox' | 'radio';
}

export interface SideBarTypes {
  sideBarList: SideBarItemType[];
  content: ContentListTypes;
}

// Type Guard
export const isAssignTypes = (props: UserTypes | LabelTypes | MilestoneTypes): props is UserTypes =>
  (props as UserTypes).nickname !== undefined;

export const isLabelTypes = (props: UserTypes | LabelTypes | MilestoneTypes): props is LabelTypes =>
  (props as LabelTypes).backgroundColorCode !== undefined;

export const isMilestoneTypes = (props: UserTypes | LabelTypes | MilestoneTypes): props is MilestoneTypes =>
  (props as MilestoneTypes).openIssueCount !== undefined && (props as MilestoneTypes).closedIssueCount !== undefined;
