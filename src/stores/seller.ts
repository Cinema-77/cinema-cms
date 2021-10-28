import create from 'zustand';

import { SITE_MODAL_TYPES } from '@/constants';
import { AuthUser, getUserProfile } from '@/features/seller';

type Keys = keyof typeof SITE_MODAL_TYPES;
export type ModalType = typeof SITE_MODAL_TYPES[Keys];

type SellerStore = {
  openModal: boolean;
  modalType: ModalType;
  step: number;
  isLoading: boolean;
  member: AuthUser;
  setModal: (modalType: ModalType) => void;
  closeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  fetchMember: (phoneNumber: string) => void;
};

export const useSellerStore = create<SellerStore>((set) => ({
  openModal: false,
  modalType: '',
  step: 1,
  isLoading: false,
  member: {} as AuthUser,
  setModal: (modalType) =>
    set(() => ({
      modalType,
      openModal: true,
    })),
  closeModal: () => set(() => ({ openModal: false })),
  nextStep: () =>
    set((state) => ({
      step: state.step > 3 ? 3 : state.step + 1,
    })),
  previousStep: () =>
    set((state) => ({
      step: state.step - 1,
    })),
  fetchMember: async (phoneNumber: string) => {
    set({ isLoading: true });
    const { user } = await getUserProfile({ phoneNumber });

    set({ member: user, isLoading: false });
  },
}));
