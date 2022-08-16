import { MemeberResponseTypes } from '@/api/signUp';
import { atom } from 'recoil';

export const UserInfoState = atom<MemeberResponseTypes>({
  key: 'UserInfoState',
  default: {
    id: 0,
    email: '',
    nickname: '',
    profileImage: '',
  },
});
