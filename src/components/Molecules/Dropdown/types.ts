import { UserTypes, MilestoneTypes, LabelTypes } from '@/api/issue/types';

import React from 'react';
import * as panels from '@/components/Molecules/Dropdown/Panel/panels';
import { UsedEmojisTypes } from '@/components/Molecules/Comment';
import { ReactionTypes } from '@/api/issue/reaction';

// Indicator Types

export interface DropdownIndicatorTypes {
  indicatorStyle: 'STANDARD' | 'FILTERBAR' | 'ICON' | 'SIDEBAR';
  indicatorLabel: string;
  isActive?: boolean;
  indicatorIcon?: React.ReactNode;
}

// ListPanel Types

export interface IssueTypes {
  id: number;
  dataId: string;
  title: string;
}

export interface UNUSED_OPTIONS_TYPES {
  dataId: string;
  title: string;
}

export interface ListPanelTypes {
  panelId: 'assignee' | 'label' | 'milestone' | 'issue' | 'auther' | 'state';
  panelTitle: string;
  panelType: 'checkbox' | 'radio';
  panelList?: LabelTypes[] | UserTypes[] | IssueTypes[] | MilestoneTypes[];
  unusedOption?: UNUSED_OPTIONS_TYPES;
  handleOnClick?: (target: HTMLInputElement) => void;
  isChecked?: (title: string) => boolean;
}

// ListPanel/Label Types

export interface ColorLabelTypes {
  backgroundColor: string;
}

// ReactionPanel Types

export interface ReactionPanelTypes {
  reactions: ReactionTypes[];
  usedEmojis: UsedEmojisTypes[];
  issueId: number;
  commentId: number;
}

export type PanelType = keyof typeof panels;
export interface DropdownPanelTypes {
  type: PanelType;
  prop: ReactionPanelTypes | ListPanelTypes;
}

// Dropdown Types

export interface DropdownTypes<Panel> {
  type: PanelType;
  indicatorProps: DropdownIndicatorTypes;
  panelProps: Panel;
  isActive?: boolean;
}
