import { ComboItem, SeatType, TicketType } from '@/features/seller';
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
    roomName: room.name,
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

export const getInvoiceTotal = (seats: SeatType[]) =>
  seats.reduce((previousValue, seat) => previousValue + seat.price, 0);

export const getComboTotal = (combos: ComboItem[]) =>
  combos.reduce((sum, crItem) => sum + crItem.price * crItem.quantity, 0);

export const getNameSeats = (seats: SeatType[]) => seats.map((seat) => seat.seatName).join(', ');

export const getNameCombo = (combos: ComboItem[]) =>
  combos.map((combo) => `${combo.name} (${combo.quantity})`).join(', ');

export const getNewPoint = (combos: ComboItem[], seats: SeatType[]) =>
  Math.floor((getInvoiceTotal(seats) + getComboTotal(combos)) / 10000);
