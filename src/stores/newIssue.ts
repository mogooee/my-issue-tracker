import { atom } from 'recoil';

export interface NEW_ISSUE_FORM_TYPES {
  title: string;
  comment: string;
  assigneeIds: number[];
  labelIds: number[];
  milestoneId: null | number;
}

const DEFAULT_NEW_ISSUE_FORM_STATE: NEW_ISSUE_FORM_TYPES = {
  title: '',
  comment: '',
  assigneeIds: [],
  labelIds: [],
  milestoneId: null,
};

export const NewIssueFormState = atom({
  key: 'NewIssueFormState',
  default: DEFAULT_NEW_ISSUE_FORM_STATE,
});
