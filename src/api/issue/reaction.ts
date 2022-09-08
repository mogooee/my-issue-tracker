import axios, { AxiosError } from 'axios';

export type ReactionNameType =
  | 'THUMBS_UP'
  | 'THUMBS_DOWN'
  | 'LAUGH'
  | 'PARTY_POPPER'
  | 'CONFUSED'
  | 'HEART'
  | 'ROCKET'
  | 'EYES';

export interface ReactionTypes {
  name: ReactionNameType;
  unicode: string;
}

export const getReactionData = async (): Promise<ReactionTypes[]> => {
  try {
    const { data } = await axios.get<ReactionTypes[]>('api/issues/comments/reactions/emojis');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
