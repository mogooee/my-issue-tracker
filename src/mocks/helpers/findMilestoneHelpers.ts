import { MilestoneTypes } from '@/api/issue/types';
import { MILESTONE_TABLE } from '../tables/issue';

export const findMilestoneHelper = (id: number) =>
  Object.values(MILESTONE_TABLE)
    .flat()
    .find((milestone) => milestone.id === id) as MilestoneTypes | undefined;
