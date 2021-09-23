import React, { useState } from 'react';
import * as S from './MovieResult.style';
import search from '@/assets/icon/search.svg';
import { MovieFormList, ErrorMessage } from '@/features/manageMovie';
import { Controller, useForm } from 'react-hook-form';
import { rules } from '@/utils/rules';
import axios from 'axios';

interface MovieResultProps {}

export const MovieResult: React.FC<MovieResultProps> = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      time: '',
      daodien: '',
      dienvien: '',
      content: '',
      image: '',
      trailer: '',
    },
  });
  const handleValue = async (data: any) => {
    try {
      const res = await axios.post('https://614c53fe59e92d00176ad19a.mockapi.io/Movie', data);
      console.log(res);
      setOpenAdd(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <S.MovieResult>
      <S.MovieSearch>
        <S.MovieSearchBtn>
          <img src={search} alt="" />
        </S.MovieSearchBtn>
        <S.MovieSearchInput placeholder="Search" />
      </S.MovieSearch>
      <S.MovieAdd onClick={() => setOpenAdd(true)}>
        <svg height="448pt" viewBox="0 0 448 448" width="448pt" xmlns="http://www.w3.org/2000/svg">
          <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
        </svg>
        Add Movie
      </S.MovieAdd>
      {openAdd && (
        <S.MovieFormAdd>
          <S.MovieForm onSubmit={handleSubmit(handleValue)}>
            <S.MovieFormTitle>
              Add Movie
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 22.88 22.88"
                xmlSpace="preserve"
                onClick={() => setOpenAdd(false)}
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
            <Controller
              name="name"
              control={control}
              rules={rules.name}
              render={({ field }) => (
                <MovieFormList
                  name="name"
                  title="Tên Film"
                  change={field.onChange}
                  value={getValues('name')}
                />
              )}
            />
            <ErrorMessage name="name" errors={errors} />
            <Controller
              name="time"
              control={control}
              rules={rules.time}
              render={({ field }) => (
                <MovieFormList
                  name="time"
                  title="Thời lượng"
                  change={field.onChange}
                  value={getValues('time')}
                />
              )}
            />
            <ErrorMessage name="time" errors={errors} />
            <Controller
              name="daodien"
              control={control}
              rules={rules.daodien}
              render={({ field }) => (
                <MovieFormList
                  name="daodien"
                  title="Đạo diễn"
                  change={field.onChange}
                  value={getValues('daodien')}
                />
              )}
            />
            <ErrorMessage name="daodien" errors={errors} />
            <Controller
              name="dienvien"
              control={control}
              rules={rules.dienvien}
              render={({ field }) => (
                <MovieFormList
                  name="dienvien"
                  title="Diễn viên"
                  change={field.onChange}
                  value={getValues('dienvien')}
                />
              )}
            />
            <ErrorMessage name="dienvien" errors={errors} />
            <Controller
              name="content"
              control={control}
              rules={rules.content}
              render={({ field }) => (
                <MovieFormList
                  name="content"
                  title="Nội dung"
                  textarea
                  change={field.onChange}
                  value={getValues('content')}
                />
              )}
            />
            <ErrorMessage name="content" errors={errors} />
            <Controller
              name="image"
              control={control}
              rules={rules.image}
              render={({ field }) => (
                <MovieFormList
                  name="image"
                  title="Image URL"
                  change={field.onChange}
                  value={getValues('image')}
                />
              )}
            />
            <ErrorMessage name="image" errors={errors} />
            <Controller
              name="trailer"
              control={control}
              rules={rules.trailer}
              render={({ field }) => (
                <MovieFormList
                  name="trailer"
                  title="Trailer URL"
                  change={field.onChange}
                  value={getValues('trailer')}
                />
              )}
            />
            <ErrorMessage name="trailer" errors={errors} />
            <S.MovieFormListBtn>
              <S.MovieFormBtn onClick={() => setOpenAdd(false)}>Cancel</S.MovieFormBtn>
              <S.MovieFormBtn>Create</S.MovieFormBtn>
            </S.MovieFormListBtn>
          </S.MovieForm>
        </S.MovieFormAdd>
      )}
    </S.MovieResult>
  );
};
