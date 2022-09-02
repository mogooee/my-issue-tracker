import { MilestoneItemTypes } from '@/components/Molecules/MilestoneItem';
import { atom } from 'recoil';

const InitMilestone: MilestoneItemTypes = { id: 0, title: '', description: '', dueDate: '', closed: false };

export const ClickMilestoneState = atom<MilestoneItemTypes>({
  key: 'ClickMilestoneState',
  default: InitMilestone,
});
