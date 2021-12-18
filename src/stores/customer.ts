import create from 'zustand';

import { CUSTOMER_FORM } from '@/constants';
import { mapInitialCustomer } from '@/features/customer';

type useCustomerStoreType = {
  type: string;
  isOpen: boolean;
  initialValues: {
    id?: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    address?: {
      city: string;
      district: string;
      ward: string;
      street: string;
    };
    dateOfBirth: string;
    hobby?: string;
    male?: boolean;
    avatar?: string;
  };
  onOpen: (type: string, data?: any) => void;
  onClose: () => void;
};

const defaultCustomer = {
  email: '',
  phoneNumber: '',
  fullName: '',
  dateOfBirth: '',
};

export const useCustomerStore = create<useCustomerStoreType>((set) => ({
  type: '',
  isOpen: false,
  initialValues: {
    email: '',
    phoneNumber: '',
    fullName: '',
    dateOfBirth: '',
  },
  onOpen: (type: string, data?: any) =>
    set(() => ({
      isOpen: true,
      type,
      initialValues: type === CUSTOMER_FORM.EDIT ? mapInitialCustomer(data) : defaultCustomer,
    })),
  onClose: () => set(() => ({ isOpen: false })),
}));
