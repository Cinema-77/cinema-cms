import { isWeekend } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { Ticket } from '@/features/seller';
import { ShowTimesDetail } from '@/features/showtimes';
import { getDay, getEachDayOfInterval } from '@/utils/format';

export const getRangeDate = () => {
  const today = new Date();
  const endDay = today.setDate(today.getDate() + 5);
  const result = getEachDayOfInterval({
    start: new Date(),
    end: endDay,
  });
  return {
    rangeDate: result,
    startDay: new Date(),
    endDay,
  };
};

export const mapToShowtimeDetails = (showtime: ShowTimesDetail) => {
  const { _id, date, room, showTime, timeSlot } = showtime;

  return {
    _id,
    date: `${getDay(date)}, ${date}`,
    rowNumber: room.rowNumber,
    seatsInRow: room.seatsInRow,
    screenName: room.screen.name,
    weekdayPrice: room.screen.weekdayPrice,
    weekendPrice: room.screen.weekendPrice,
    movieName: showTime.movie.name,
    moviePoster: showTime.movie.image,
    movieLimitAge: showTime.movie.age,
    time: timeSlot.time,
  };
};

export interface SeatType {
  nameRow: string;
  seatsName: Ticket[];
}

export const mapToSeat = (showTime: ShowTimesDetail): SeatType[] => {
  const { rowNumber, seatsInRow, _id, weekdayPrice, weekendPrice } = mapToShowtimeDetails(showTime);
  const seats = [];

  for (let i = 0; i < rowNumber; i += 1) {
    const nameRow = String.fromCharCode(i + 65);
    const seatsName: Ticket[] = [];

    for (let j = 1; j <= seatsInRow; j += 1) {
      const priceSeat = isWeekend(new Date()) ? weekendPrice : weekdayPrice;
      const newSeat: Ticket = {
        idSeat: uuidv4(),
        seatName: nameRow + j,
        price: priceSeat,
        status: 0,
        showTimeDetail: _id,
      };
      seatsName.push(newSeat);
    }
    seats.push({ nameRow, seatsName });
  }
  return seats;
};
