import create from 'zustand';

import { FoodValues } from '@/features/foods';

type FoodDTO = {
  type: string;
  foodId: string;
  imageSource: string;
  data: FoodValues;
};

type useFoodStoreType = {
  type: string;
  isOpen: boolean;
  foodId: string;
  data: FoodValues;
  imageSource: string;
  onOpen: () => void;
  onClose: () => void;
  setType: ({ type, data, foodId, imageSource }: FoodDTO) => void;
  setImageSource: (url: string) => void;
};

export const useFoodStore = create<useFoodStoreType>((set) => ({
  type: '',
  isOpen: false,
  data: {} as FoodValues,
  imageSource: '',
  foodId: '',
  onOpen: () =>
    set(() => ({
      isOpen: true,
    })),
  onClose: () => set(() => ({ isOpen: false })),
  setType: ({ type, data, foodId, imageSource }: FoodDTO) =>
    set(() => ({ type, data, foodId, imageSource })),
  setImageSource: (url: string) => set(() => ({ imageSource: url })),
}));
