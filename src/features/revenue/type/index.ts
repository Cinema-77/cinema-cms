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
