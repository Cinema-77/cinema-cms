import { MovieType } from '@/features/manageMovie';
import { ScreenType, Room } from '@/features/room';

export interface showTime {
  _id: string;
  date: string;
  room: Room[];
}
export interface ShowTimesResponse {
  success: boolean;
  message: string;
  showTimes: showTime[];
}

interface FormatMovie {
  _id: string;
  screen: ScreenType;
  movie: MovieType;
}

export interface FormatMovieResponse {
  success: boolean;
  message: string;
  values: {
    screenDetails: FormatMovie[];
  };
}

export interface TimeStamp {
  roomId: string;
  times: string[];
  dateStart: string;
  dateEnd: string;
}
