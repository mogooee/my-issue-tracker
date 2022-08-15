// Indicator Types
export interface DropdownIndicatorTypes {
  indicatorStyle: 'STANDARD' | 'FILTERBAR';
  indicatorLabel: string;
  isActive?: boolean;
}

// Panel Types
export interface LabelTypes {
  id: number | string;
  title: string;
  backgroundColor: string;
  titleColor?: 'black' | 'white';
}

export interface UserTypes {
  id: number | string;
  loginId: string;
  profileImageUrl: string;
}

export interface IssueTypes {
  id: number;
  dataId: string;
  title: string;
}

export interface UNUSED_OPTIONS_TYPES {
  dataId: string;
  title: string;
}

export interface DropdownPanelsTypes {
  panelTitle: string;
  panelType: 'checkbox' | 'radio';
  panelList: LabelTypes[] | UserTypes[] | IssueTypes[];
  unusedOption?: UNUSED_OPTIONS_TYPES;
}

// Panel/Label Types
export interface ColorLabelTypes {
  backgroundColor: string;
}

export interface UserImgLabelTypes {
  profileImageUrl: string;
  loginId: string;
}

// Dropdown Types
export type DropdownTypes = DropdownIndicatorTypes & DropdownPanelsTypes;
