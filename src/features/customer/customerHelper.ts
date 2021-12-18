import { Customer } from '@/features/auth';

export const mapInitialCustomer = (customer: Customer) => {
  return {
    id: customer._id,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    fullName: customer.profile.fullName,
    address: {
      city: customer.profile.address?.city || '',
      district: customer.profile.address?.district || '',
      ward: customer.profile.address?.ward || '',
      street: customer.profile.address?.street || '',
    },
    dateOfBirth: customer.profile.dateOfBirth,
    hobby: customer.profile.hobby || '',
    male: customer.profile.male || true,
    avatar: customer.profile.avatar || '',
  };
};
