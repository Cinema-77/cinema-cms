import create from 'zustand';

import { SITE_MODAL_TYPES } from '@/constants';
import { AuthUser, getUserProfile, ComboItem, SeatType } from '@/features/seller';

type Keys = keyof typeof SITE_MODAL_TYPES;
export type ModalType = typeof SITE_MODAL_TYPES[Keys];

type SellerStore = {
  openModal: boolean;
  modalType: ModalType;
  step: number;
  isLoading: boolean;
  member: AuthUser;
  selectedSeats: SeatType[];
  selectedCombos: ComboItem[];
  setSelectedSeats: (seats: SeatType[]) => void;
  setModal: (modalType: ModalType) => void;
  closeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  fetchMember: (phoneNumber: string) => void;
  inc: (item: ComboItem) => void;
  des: (item: ComboItem) => void;
  reset: () => void;
};

export const useSellerStore = create<SellerStore>((set) => ({
  openModal: false,
  modalType: '',
  step: 1,
  isLoading: false,
  member: {} as AuthUser,
  selectedCombos: [],
  selectedSeats: [],
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
    const { user, success } = await getUserProfile({ phoneNumber });

    if (!success) {
      set({ isLoading: false });
    } else {
      set({ member: user, isLoading: false, step: 1 });
    }
  },
  setSelectedSeats: (seats: SeatType[]) => set(() => ({ selectedSeats: seats })),
  inc: (item: ComboItem) =>
    set((state) => {
      const comboItem = state.selectedCombos.find((combo) => combo._id === item._id);
      if (comboItem) {
        comboItem.quantity++;
        set({ selectedCombos: [...state.selectedCombos] });
      } else {
        set({ selectedCombos: [...state.selectedCombos, { ...item, quantity: 1 }] });
      }
    }),
  des: (item: ComboItem) =>
    set((state) => {
      const comboItem = state.selectedCombos.find((combo) => combo._id === item._id);
      if (comboItem) {
        comboItem.quantity--;
        set({ selectedCombos: [...state.selectedCombos] });

        if (comboItem.quantity === 0) {
          const newSelectedCombos = [...state.selectedCombos].filter((combo) => combo.quantity > 0);
          set({ selectedCombos: newSelectedCombos });
        }
      }
    }),
  reset: () =>
    set((state) => ({
      ...state,
      selectedSeats: [],
      selectedCombos: [],
      step: 1,
      member: {} as AuthUser,
    })),
}));
