import { Response } from '@/api/signUp';
import { atom } from 'recoil';

export const UserInfoState = atom<Response>({
  key: 'UserInfoState',
  default: {
    id: 0,
    email: '',
    nickname: '',
    profileImage: '',
  },
});
