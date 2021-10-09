import React from 'react';

import { MovieList, MovieResult } from '@/features/manageMovie';
interface manageMovieProps {
  children?: React.ReactNode;
}

export const manageMovie: React.FC<manageMovieProps> = () => {
  return (
    <main>
      <MovieResult />
      <MovieList />
    </main>
  );
};
