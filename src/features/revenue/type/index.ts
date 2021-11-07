export interface IRevenue {
  date: string;
  countTicket: number;
  totalPrice: number;
}

export interface RevenueResponse {
  success: boolean;
  message: string;
  data: IRevenue[];
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
