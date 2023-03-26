import { atom } from 'recoil';

export const ModalState = atom<boolean>({
  key: 'ModalState',
  default: false,
});

export const iOSMobileModalState = atom<boolean>({
  key: 'iOSMobileModalState',
  default: true,
});
