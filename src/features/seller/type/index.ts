import { ShowTimesDetail } from '@/features/showtimes';

export interface SeatType {
  idSeat: string;
  seatName: string;
  price: number;
  status: 1 | 0;
  showTimeDetail?: string;
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
    combos: ComboItem[];
  };
}

export interface ComboItem {
  _id: string;
  name: string;
  quantity: number;
  image: string;
  unit: string;
  price: number;
}

export enum UserType {
  Adult = 'Adult',
  Student = 'Student',
  Child = 'Child',
}

interface IBill {
  createdAt: string;
  paymentType: number;
  total: number;
  user: string;
}

export interface BillsResponse {
  foodBill: {
    bill: IBill;
    data: ComboItem[];
  };
  ticketBill: {
    bill: IBill;
    data: SeatType[];
  };
  time: string;
  movieName: string;
  roomName: string;
  date: string;
}
export interface BuyTicketResponse {
  success: boolean;
  message: string;
  combos: ComboItem[];
  tickets: SeatType[];
  gifts: IGift[];
  showTimeDetail: ShowTimesDetail;
  bills: BillsResponse;
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
  point: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

export interface IGift {
  _id: string;
  name: string;
  image: string;
  point: number;
  type: 1 | 0;
  screenId: string;
  quantity: number;
  coupon: boolean;
}

export interface GiftResponse {
  status: boolean;
  message: string;
  values: {
    gifts: IGift[];
  };
}
