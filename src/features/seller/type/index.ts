import { ShowTimesDetail } from '@/features/showtimes';

export interface SeatType {
  idSeat: string;
  seatName: string;
  price: number;
  status: 1 | 0;
  showTimeDetail: string;
}

export interface TicketType {
  nameRow: string;
  nameSeats: SeatType[];
}

export interface TicketResponse {
  success: boolean;
  message: string;
  values: {
    tickets: TicketType[];
    showTimeDetail: ShowTimesDetail;
  };
}

export enum UserType {
  Adult = 'Adult',
  Student = 'Student',
  Child = 'Child',
}

interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
}

interface UserProfile {
  fullName: string;
  dateOfBirth: string;
  address: UserAddress;
}
export interface AuthUser {
  _id: string;
  email: string;
  createdAt: string;
  phoneNumber: string;
  profile: UserProfile;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}
