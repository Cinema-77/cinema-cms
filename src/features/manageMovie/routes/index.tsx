import React from 'react';

import { MovieResult } from '@/features/manageMovie';
interface manageMovieProps {
  children?: React.ReactNode;
}

export const manageMovie: React.FC<manageMovieProps> = () => {
  return (
    <main>
      <MovieResult />
    </main>
  );
};
