import { MilestoneTypes } from '@/api/issue/types';
import { atom } from 'recoil';

const InitMilestone: MilestoneTypes = {
  id: 0,
  title: '',
  description: '',
  dueDate: '',
  closed: false,
  openIssueCount: 0,
  closedIssueCount: 0,
};

export const ClickMilestoneState = atom<MilestoneTypes>({
  key: 'ClickMilestoneState',
  default: InitMilestone,
});
