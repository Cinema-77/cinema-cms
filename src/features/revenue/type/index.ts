import { MovieType } from '@/features/manageMovie';
import { Room, TimeSlot } from '@/features/room';

export interface IRevenue {
  countAdultTicket: number;
  countChildTicket: number;
  countStudentTicket: number;
  countTicket: number;
  countTicketCoupon: number;
  countTicketPoint: number;
  date: string;
  totalPrice: number;
  totalPriceFood: number;
  totalPriceFoodCoupon: number;
  totalPriceFoodPoint: number;
  totalPriceTicket: number;
  totalPriceTicketCoupon: number;
  totalPriceTicketPoint: number;
}

interface IRevenueWithMovie extends IRevenue {
  movie: MovieType;
}

interface IRevenueWithRoom extends IRevenue {
  room: Room;
}

interface IRevenueWithTime extends IRevenue {
  timeSlot: TimeSlot;
}

export interface IRevenueData extends IRevenue {
  movies: IRevenueWithMovie[];
  rooms: IRevenueWithRoom[];
  timeSlots: IRevenueWithTime[];
}

export interface RevenueResponse {
  success: boolean;
  message: string;
  data: IRevenueData[];
}

export interface RevenueQuarterResponse {
  success: boolean;
  message: string;
  data: IRevenueQuarter[];
}

export interface IRevenueQuarter {
  quarter: number;
  months: number[];
  countTicket: number;
  totalPrice: number;
}
