import React, { useState } from 'react';

import * as S from './MovieList.style';

import { MovieItem } from '@/features/manageMovie';

interface MovieListProps {
  children?: React.ReactNode;
}

export const MovieList: React.FC<MovieListProps> = () => {
  const [movies] = useState([
    {
      name: 'A QUIET PLACE',
      time: '90 phút',
      detail:
        'A Quiet Place 2 là bộ phim kinh dị được mong chờ nhất 2020. Mất đi người chồng người cha trụ cột, mẹ góa con côi nhà Abbott sẽ ra sao ở thế giới đầy bọn quái vật? Chắc chắn mẹ con Evelyn Abbott sẽ phải trải qua rất nhiều nguy hiểm để tìm cách sống còn.',
      image: 'https://www.galaxycine.vn/media/2021/5/25/poster-vdcl-2-final_1621960082675.jpg',
      trailer: 'https://www.youtube.com/embed/kpYSR-kY-4k',
      daodien: 'Paramount Pictures',
      dienvien: 'Emily Blunt, Cillian Murphy, Noah Jupe',
      age: '18',
    },
  ]);
  return (
    <S.Movie>
      <S.MovieTitle>List Movie</S.MovieTitle>
      <S.MovieList>
        {movies.map((movie, index) => (
          <MovieItem
            key={index}
            name={movie.name}
            time={movie.time}
            detail={movie.detail}
            image={movie.image}
            trailer={movie.trailer}
            daodien={movie.daodien}
            dienvien={movie.dienvien}
            age={movie.age}
          />
        ))}
      </S.MovieList>
    </S.Movie>
  );
};
