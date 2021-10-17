import {
  format,
  nextMonday,
  nextSunday,
  previousMonday,
  previousSunday,
  endOfWeek,
  startOfWeek,
  parse,
} from 'date-fns';

export const formatDate = (date: number) => format(date, 'MM/dd/yyyy');

export const getDay = (date: string) => {
  let day;

  switch (new Date(date).getDay()) {
    case 0:
      day = 'Chủ Nhật';
      break;
    case 1:
      day = 'Thứ 2';
      break;
    case 2:
      day = 'Thứ 3';
      break;
    case 3:
      day = 'Thứ 4';
      break;
    case 4:
      day = 'Thứ 5';
      break;
    case 5:
      day = 'Thứ 6';
      break;
    case 6:
      day = 'Thứ 7';
  }
  return day;
};

export const getNextMonday = (date: string) =>
  format(nextMonday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getNextSunday = (date: string) =>
  format(nextSunday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getPrevMonday = (date: string) =>
  format(previousMonday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getPrevSunday = (date: string) =>
  format(previousSunday(parse(date, 'MM/dd/yyyy', new Date())), 'MM/dd/yyyy');

export const getCurrentMonday = () =>
  format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'MM/dd/yyyy');

export const getCurrentSunday = () =>
  format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'MM/dd/yyyy');
