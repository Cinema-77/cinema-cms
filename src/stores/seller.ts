import create from 'zustand';

import { SITE_MODAL_TYPES } from '@/constants';
import {
  AuthUser,
  getUserProfile,
  ComboItem,
  SeatType,
  BillsResponse,
  IGift,
  getGiftByScreen,
} from '@/features/seller';

type Keys = keyof typeof SITE_MODAL_TYPES;
export type ModalType = typeof SITE_MODAL_TYPES[Keys];

type SellerStore = {
  openModal: boolean;
  modalType: ModalType;
  step: number;
  point: number;
  isLoading: boolean;
  member: AuthUser;
  selectedSeats: SeatType[];
  selectedCombos: ComboItem[];
  selectedGifts: IGift[];
  bills: BillsResponse;
  gifts: IGift[];
  setSelectedSeats: (seats: SeatType[]) => void;
  setBills: (bills: BillsResponse) => void;
  setSelectedGift: (gift: IGift) => void;
  setModal: (modalType: ModalType) => void;
  clearBill: () => void;
  closeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  fetchMember: (phoneNumber: string) => Promise<boolean>;
  fetchGifts: (screenId: string) => Promise<boolean>;
  incGift: (gift: IGift) => void;
  desGift: (gift: IGift) => void;
  inc: (item: ComboItem) => void;
  des: (item: ComboItem) => void;
  reset: () => void;
};

export const useSellerStore = create<SellerStore>((set) => ({
  openModal: false,
  modalType: '',
  step: 1,
  point: 0,
  isLoading: false,
  member: {} as AuthUser,
  bills: {} as BillsResponse,
  gifts: [],
  selectedCombos: [],
  selectedSeats: [],
  selectedGifts: [],
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
      return false;
    } else {
      set({ member: user, isLoading: false, point: user.point });
    }
    return true;
  },
  fetchGifts: async (screenId: string) => {
    set({ isLoading: true });
    const { values, status } = await getGiftByScreen({ screenId });

    if (!status) {
      set({ isLoading: false });
      return false;
    } else {
      set({ gifts: values.gifts, isLoading: false });
    }
    return true;
  },
  setSelectedSeats: (seats: SeatType[]) => set(() => ({ selectedSeats: seats })),
  setBills: (bills: BillsResponse) => set(() => ({ bills })),
  clearBill: () => set(() => ({ bills: {} as BillsResponse })),
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
  setSelectedGift: (gift: IGift) => {
    set((state) => {
      const hasGift = state.selectedGifts.find((g) => g._id === gift._id);
      const newSelectedGift = hasGift
        ? state.selectedGifts.filter((g) => g._id !== gift._id)
        : [...state.selectedGifts, gift];

      const newPoint = hasGift ? state.point + hasGift.point : state.point - gift.point;

      return { ...state, selectedGifts: newSelectedGift, point: newPoint };
    });
  },
  incGift: (gift: IGift) =>
    set((state) => {
      const hasGift = state.selectedGifts.find((g) => g._id === gift._id);
      const newPoint = state.point - gift.point;
      const coupon = false;

      if (hasGift) {
        hasGift.quantity++;
        return { ...state, selectedGifts: [...state.selectedGifts], point: newPoint };
      } else {
        return {
          selectedGifts: [...state.selectedGifts, { ...gift, quantity: 1, coupon }],
          point: newPoint,
        };
      }
    }),
  desGift: (gift: IGift) =>
    set((state) => {
      const hasGift = state.selectedGifts.find((g) => g._id === gift._id);
      const newPoint = state.point + gift.point;

      if (hasGift) {
        hasGift.quantity--;
        set({ selectedGifts: [...state.selectedGifts], point: newPoint });

        if (hasGift.quantity === 0) {
          const newSelectedGifts = [...state.selectedGifts].filter((g) => g.quantity > 0);
          set({ selectedGifts: newSelectedGifts, point: newPoint });
        }
      }
    }),
  reset: () =>
    set((state) => ({
      ...state,
      selectedGifts: [],
      selectedSeats: [],
      selectedCombos: [],
      step: 1,
      member: {} as AuthUser,
      point: 0,
    })),
}));
