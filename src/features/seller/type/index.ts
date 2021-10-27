import { ShowTimesDetail } from '@/features/showtimes';

export interface Ticket {
  _id?: string;
  idSeat: string;
  seatName: string;
  price: number;
  status: 1 | 0;
  showTimeDetail: string;
}

export interface TicketResponse {
  success: boolean;
  message: string;
  values: {
    tickets: Ticket[];
    showTimeDetail: ShowTimesDetail;
  };
}
