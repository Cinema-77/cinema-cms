import { MovieType } from '@/features/manageMovie';
import { ScreenType } from '@/features/room';

export interface ShowTimesResponse {
  dateStart: string;
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
