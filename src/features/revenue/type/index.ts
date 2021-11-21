import { MovieType } from '@/features/manageMovie';
import { Room, TimeSlot } from '@/features/room';

interface BaseEntity {
  success: boolean;
  message: string;
}

export interface IRevenue {
  _id: string;
  name: string;
  price: number;
  count: number;
}

export interface IStatistical {
  ticket: {
    adult: IRevenue;
    child: IRevenue;
    student: IRevenue;
    total: number;
    totalPromotion: number;
  };
  food: {
    combo: IRevenue[];
    total: number;
    totalPromotion: number;
  };
  totalPrice: number;
}

export interface IRevenueWithMovie {
  movie: MovieType;
  statistical: IStatistical;
}

export interface IRevenueWithRoom {
  room: Room;
  statistical: IStatistical;
}

export interface IRevenueWithTime {
  timeSlot: TimeSlot;
  statistical: IStatistical;
}

export interface IRevenueData extends IStatistical {
  date: string;
}

export interface RevenueResponse extends BaseEntity {
  data: IRevenueData[];
}

export interface RevenueResponseMoive extends BaseEntity {
  data: IRevenueWithMovie[];
}

export interface RevenueResponseRoom extends BaseEntity {
  data: IRevenueWithRoom[];
}

export interface RevenueResponseTime extends BaseEntity {
  data: IRevenueWithTime[];
}

export interface RevenueQuarterResponse extends BaseEntity {
  data: IRevenueQuarter[];
}

export interface IRevenueQuarter {
  quarter: number;
  months: number[];
  countTicket: number;
  totalPrice: number;
}
