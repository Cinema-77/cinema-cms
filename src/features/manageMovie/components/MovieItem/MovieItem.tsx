import React, { useState } from 'react';

import { MovieItemType } from '../../type';

import * as S from './MovieItem.style';

import clock from '@/assets/icon/clock.svg';
import edit from '@/assets/icon/edit.svg';
import play from '@/assets/icon/play.svg';
import trash from '@/assets/icon/trash.svg';
import x from '@/assets/icon/x.svg';

interface MovieItemProps {
  movieList: MovieItemType[];
  handleDeleteMovie: (id: string) => void;
}

export const MovieItem: React.FC<MovieItemProps> = ({ movieList, handleDeleteMovie }) => {
  const [openTrailer, setOpenTrailer] = useState(false);
  const [isMovie, setIsMovie] = useState(false);

  return (
    <>
      {movieList.map((movie: MovieItemType) => (
        <S.MovieItem key={movie._id}>
          <S.MovieLeft>
            <img src={movie.image} alt="" />
            <S.MovieTrailer onClick={() => setOpenTrailer(true)}>
              <img src={play} alt="" />
            </S.MovieTrailer>
          </S.MovieLeft>
          <S.MovieRight>
            <S.MovieTitle>{movie.name}</S.MovieTitle>
            <S.MovieTime>
              <img src={clock} alt="" />
              {movie.moveDuration}
            </S.MovieTime>
            <S.MovieListSpan>
              <S.MovieSpan>Đạo diễn:</S.MovieSpan>
              <S.MovieSpan>{movie.director.name}</S.MovieSpan>
            </S.MovieListSpan>
            <S.MovieListSpan>
              <S.MovieSpan>Thể loại:</S.MovieSpan>
              <S.MovieSpan>
                {movie.categories.length > 1 &&
                  movie.categories.map((category) => (
                    <span key={category._id}>{category.name}, </span>
                  ))}
                {movie.categories.length <= 1 &&
                  movie.categories.map((category) => (
                    <span key={category._id}>{category.name}</span>
                  ))}
              </S.MovieSpan>
            </S.MovieListSpan>
            <S.MovieListSpan>
              <S.MovieSpan>Diễn viên:</S.MovieSpan>
              <S.MovieSpan>{movie.cast}</S.MovieSpan>
            </S.MovieListSpan>
            <S.MovieListSpan>
              <S.MovieSpan>Độ tuổi:</S.MovieSpan>
              <S.MovieSpan>{movie.age}</S.MovieSpan>
            </S.MovieListSpan>
            <S.MovieListSpan>
              <S.MovieSpan>Loại màn:</S.MovieSpan>
              <S.MovieSpan>
                {movie.screens.length > 1 &&
                  movie.screens.map((screen) => <span key={screen._id}>{screen.name}, </span>)}
                {movie.screens.length <= 1 &&
                  movie.screens.map((screen) => <span key={screen._id}>{screen.name}</span>)}
              </S.MovieSpan>
            </S.MovieListSpan>
            <S.MovieListSpan>
              <S.MovieSpan>Nội dung:</S.MovieSpan>
              <S.MovieSpan>{movie.description}</S.MovieSpan>
            </S.MovieListSpan>
            <S.MovieListBtn>
              <S.MovieBtnEdit>
                <img src={edit} alt="" />
                Edit
              </S.MovieBtnEdit>
              <S.MovieBtnDelete onClick={() => setIsMovie(true)}>
                <img src={trash} alt="" />
                Delete
              </S.MovieBtnDelete>
            </S.MovieListBtn>
          </S.MovieRight>
          {openTrailer && (
            <S.MovieVideoTrailer>
              <img src={x} alt="" onClick={() => setOpenTrailer(false)} role="button" />
              <S.MovieVideo src={movie.trailer} frameBorder="0" allowFullScreen />
            </S.MovieVideoTrailer>
          )}
          {isMovie && (
            <S.MovieDelete>
              <S.MovieFormDelete>
                <S.MovieFormTitle>
                  Gỡ bỏ Movie?
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 22.88 22.88"
                    xmlSpace="preserve"
                    onClick={() => setIsMovie(false)}
                  >
                    <path
                      style={{ fill: '#000' }}
                      d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539
	l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539
	c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0
	c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"
                    />
                  </svg>
                </S.MovieFormTitle>
                <S.MovieFormContent>
                  Nếu bạn xóa bỏ Movie khỏi hệ thống sẽ:
                  <S.MovieFormUl>
                    <S.MovieFormLi>
                      Ngăn tất cả người dùng truy cập vào, bất kể họ giữ vai trò gì.
                    </S.MovieFormLi>
                    <S.MovieFormLi>Ẩn Movie khỏi kết quả tìm kiếm.</S.MovieFormLi>
                    <S.MovieFormLi>
                      Vô hiệu hóa khi người dùng truy cập vào Movie này.
                    </S.MovieFormLi>
                  </S.MovieFormUl>
                  <S.MovieFormListBtn>
                    <S.MovieFormBtn onClick={() => setIsMovie(false)}>Hủy</S.MovieFormBtn>
                    <S.MovieFormBtn
                      onClick={() => {
                        handleDeleteMovie(movie._id);
                        setIsMovie(false);
                      }}
                    >
                      Xóa, gỡ bỏ
                    </S.MovieFormBtn>
                  </S.MovieFormListBtn>
                </S.MovieFormContent>
              </S.MovieFormDelete>
            </S.MovieDelete>
          )}
        </S.MovieItem>
      ))}
    </>
  );
};
