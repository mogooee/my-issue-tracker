import axios, { AxiosError } from 'axios';
import { MilestonesFormTypes } from '@/components/Molecules/EditMilestone';
import { MilestoneListTypes } from '@/components/Organisms/MilestoneTable';

export const getMilestoneData = async () => {
  try {
    const { data } = await axios.get<MilestoneListTypes>('api/milestones');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const createNewMilestone = async (milestoneData: MilestonesFormTypes) => {
  try {
    const { data } = await axios.post<MilestonesFormTypes>('api/milestones', milestoneData);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const patchMilestoneData = async ({ id, milestoneData }: { id: number; milestoneData: MilestonesFormTypes }) => {
  try {
    const { data } = await axios.patch<MilestonesFormTypes>(`api/milestones/${id}`, milestoneData);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const patchMilestoneState = async (id: number) => {
  try {
    const { data } = await axios.patch<MilestonesFormTypes>(`api/milestones/${id}/status`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const deleteMilestone = async (id: number) => {
  try {
    const { data } = await axios.delete<MilestonesFormTypes>(`api/milestones/${id}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
