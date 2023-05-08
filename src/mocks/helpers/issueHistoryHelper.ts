import { IssueHistoryTypes, MilestoneTypes, UserTypes } from '@/api/issue/types';
import { LabelType } from '@/components/Atoms/Label';

export const assigneesHistory = ({
  modifierInfo,
  assigneeInfo,
  action,
}: {
  modifierInfo: UserTypes;
  assigneeInfo: UserTypes;
  action: 'ADD' | 'REMOVE';
}) =>
  ({
    modifier: { ...modifierInfo },
    modifiedAt: new Date().toISOString(),
    action: `${action}_ASSIGNEE`,
    label: null,
    milestone: null,
    assignee: {
      createdAt: '2022-09-19T06:46:53.479Z',
      lastModifiedAt: '2022-09-19T06:46:53.479Z',
      ...assigneeInfo,
    },
    previousTitle: null,
    changedTitle: null,
  } as IssueHistoryTypes);

export const labelHistory = ({
  modifierInfo,
  labelInfo,
  action,
}: {
  modifierInfo: UserTypes;
  labelInfo: LabelType;
  action: 'ADD' | 'REMOVE';
}) =>
  ({
    modifier: { ...modifierInfo },
    modifiedAt: new Date().toISOString(),
    action: `${action}_LABEL`,
    label: {
      createdAt: '2022-09-19T06:46:53.479Z',
      lastModifiedAt: '2022-09-19T06:46:53.479Z',
      ...labelInfo,
    },
    milestone: null,
    assignee: null,
    previousTitle: null,
    changedTitle: null,
  } as IssueHistoryTypes);

export const milestoneHistory = ({
  modifierInfo,
  milestoneInfo,
  action,
}: {
  modifierInfo: UserTypes;
  milestoneInfo: MilestoneTypes;
  action: 'ADD' | 'REMOVE';
}) =>
  ({
    modifier: { ...modifierInfo },
    modifiedAt: new Date().toISOString(),
    action: `${action}_MILESTONE`,
    label: null,
    milestone: {
      createdAt: '2022-09-19T06:46:53.479Z',
      lastModifiedAt: '2022-09-19T06:46:53.479Z',
      ...milestoneInfo,
    },
    assignee: null,
    previousTitle: null,
    changedTitle: null,
  } as IssueHistoryTypes);

export const changeTitleHistory = ({
  modifierInfo,
  previousTitle,
  changedTitle,
}: {
  modifierInfo: UserTypes;
  previousTitle: string;
  changedTitle: string;
}) =>
  ({
    modifier: { ...modifierInfo },
    modifiedAt: new Date().toISOString(),
    action: 'CHANGE_TITLE',
    label: null,
    milestone: null,
    assignee: null,
    previousTitle,
    changedTitle,
  } as IssueHistoryTypes);

export const changeStateHistory = ({ modifierInfo, action }: { modifierInfo: UserTypes; action: 'OPEN' | 'CLOSE' }) =>
  ({
    modifier: { ...modifierInfo },
    modifiedAt: new Date().toISOString(),
    action: `${action}_ISSUE`,
    label: null,
    milestone: null,
    assignee: null,
    previousTitle: null,
    changedTitle: null,
  } as IssueHistoryTypes);
