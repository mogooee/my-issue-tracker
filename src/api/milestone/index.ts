import axios, { AxiosError } from 'axios';
import { MilestoneTypes } from '@/api/issue/types';

export interface MilestoneListTypes {
  closedMilestones: MilestoneTypes[];
  openedMilestones: MilestoneTypes[];
}

export type RequestMilestoneTypes = Pick<MilestoneTypes, 'title' | 'description' | 'dueDate'>;

export const getMilestoneData = async () => {
  const { data } = await axios.get<MilestoneListTypes>('api/milestones');
  return data;
};

export const createNewMilestone = async (milestoneData: RequestMilestoneTypes) => {
  const { data } = await axios.post<MilestoneTypes>('api/milestones', milestoneData);
  return data;
};

export const patchMilestoneData = async ({
  id,
  milestoneData,
}: {
  id: number;
  milestoneData: RequestMilestoneTypes;
}) => {
  const { data } = await axios.patch<MilestoneTypes>(`api/milestones/${id}`, milestoneData);
  return data;
};

export const patchMilestoneState = async (id: number) => {
  const { data } = await axios.patch<MilestoneTypes>(`api/milestones/${id}/status`);
  return data;
};

export const deleteMilestone = async (id: number) => {
  const { data } = await axios.delete<MilestoneTypes>(`api/milestones/${id}`);
  return data;
};
