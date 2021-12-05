import { Skeleton } from '@chakra-ui/react';
import React from 'react';

import * as S from './MovieItem.style';

export const MovieSkeletion = () => {
  return (
    <S.MovieItem>
      <S.MovieLeft>
        <Skeleton height="100%" />
      </S.MovieLeft>
      <S.MovieRight>
        <S.MovieTitle>
          <Skeleton height="20px" />
        </S.MovieTitle>
        <S.MovieTime>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </S.MovieTime>
        <S.MovieListSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
        </S.MovieListSpan>
        <S.MovieListSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
        </S.MovieListSpan>
        <S.MovieListSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
        </S.MovieListSpan>
        <S.MovieListSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
        </S.MovieListSpan>
        <S.MovieListSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
        </S.MovieListSpan>
        <S.MovieListSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
          <S.MovieSpan>
            <Skeleton height="20px" />
          </S.MovieSpan>
        </S.MovieListSpan>
        <S.MovieListBtn>
          <Skeleton height="40px" width="100px" />
          <Skeleton height="40px" width="100px" />
        </S.MovieListBtn>
      </S.MovieRight>
    </S.MovieItem>
  );
};
