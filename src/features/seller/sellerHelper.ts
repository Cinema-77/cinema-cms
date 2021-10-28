import { TicketType } from '@/features/seller';
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

export const getOldPrice = (seatRows: TicketType[]) => {
  for (const row of seatRows) {
    const seat = row.nameSeats.find((s) => s.status === 0);
    if (seat) {
      return seat.price;
    }
  }
  return 0;
};
