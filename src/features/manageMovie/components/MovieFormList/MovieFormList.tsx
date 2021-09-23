import React from 'react';
import * as S from './MovieFormList.style';

interface MovieFormListProps {
  title: string;
  name: string;
  value: string;
  change: React.ChangeEventHandler;
  textarea?: string | boolean;
}

export const MovieFormList: React.FC<MovieFormListProps> = ({
  title,
  textarea,
  name,
  change,
  value,
}) => {
  return (
    <S.MovieFormList>
      {title}
      {!textarea && <S.MovieFormInput name={name} onChange={change} value={value} />}
      {textarea && <S.MovieFormArea name={name} onChange={change} value={value} />}
    </S.MovieFormList>
  );
};
