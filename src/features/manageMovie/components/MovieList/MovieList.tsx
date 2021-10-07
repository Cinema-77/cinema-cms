import React from 'react';
import { MovieItem } from '@/features/manageMovie';
import * as S from './MovieList.style'; 
import { MovieItemType } from '../../type';

interface MovieListProps {
  movieList:MovieItemType[]
}

export const MovieList: React.FC<MovieListProps> = ({movieList}) => {
  return (
    <S.Movie>
      <S.MovieTitle>List Movie</S.MovieTitle>
      <S.MovieList>
        {movieList.map((movie:MovieItemType) => (
          <MovieItem
            key={movie._id}
            _id={movie._id}
            name={movie.name}
            moveDuration={movie.moveDuration}
            description={movie.description}
            image={movie.image}
            trailer={movie.trailer}
            director={movie.director}
            cast={movie.cast}
            age={movie.age}
            categories={movie.categories}
            screens={movie.screens}
          />
        ))}
      </S.MovieList>
    </S.Movie>
  );
};
