import { useToast } from '@chakra-ui/toast';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import qs from 'query-string';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { CategoryItem, MovieType, filterProps } from '../../type';
import { MovieSkeletion } from '../MovieItem/MovieSkeletion';
import { MoviePagination } from '../MoviePagination/MoviePagination';
import { getMovieList } from '../MovieSlice';

import * as S from './MovieResult.style';

import search from '@/assets/icon/search.svg';
import x2 from '@/assets/icon/x2.svg';
import { ErrorMessage, SingleSelect } from '@/components';
import { InputField, Form, SelectField } from '@/components/Form2';
import { CheckboxField } from '@/components/Form2/CheckboxField/CheckboxField';
import {
  MovieItem,
  getCategoryAll,
  getDirectorAll,
  getScreenAll,
  createMovie,
  directorType,
  screenType,
} from '@/features/manageMovie';
import { storage } from '@/lib/firebase';
import { rules } from '@/utils/rules';

export const MovieResult = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(false);
  const [filters, setFilters] = useState<filterProps>({
    page: 1,
    limit: 3,
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const query = useMemo(() => qs.parse(location.search), [location.search]);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [directorList, setDirectorList] = useState<directorType[]>([]);
  const [screenList, setScreenList] = useState<screenType[]>([]);
  const [screenValue, setScreenValue] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const update = useSelector(
    (state: {
      movie: {
        isLoading: boolean;
      };
    }) => state.movie.isLoading,
  );
  const {
    control,
    getValues,
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const _filter = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 3,
    };
    setFilters(_filter);
    const params = {
      page: _filter.page,
      limit: _filter.limit,
    };
    const _getMovieList = async () => {
      await dispatch(getMovieList(qs.stringify(params)));
    };
    _getMovieList();
  }, [movie, query.page, query.limit, dispatch]);

  useEffect(() => {
    if (update) {
      setIsLoading(false);
    }
  }, [update]);

  const handleValue = async (data: MovieType) => {
    const body = {
      name: data.name,
      moveDuration: Number(data.moveDuration),
      image: data.image,
      trailer: data.trailer,
      description: data.description,
      directorId: data.directorId,
      cast: data.cast,
      age: Number(data.age),
      screensId: screenValue,
      categoryId: categoryValue,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    };
    try {
      const res = await createMovie(body);
      if (res.success === false) {
        if (res.errors.dateStart) {
          toast({
            title: res.errors.dateStart,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
        if (res.errors.dateEnd) {
          toast({
            title: res.errors.dateEnd,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
      } else {
        toast({
          title: res.message,
          position: 'top-right',
          status: 'success',
          duration: 3000,
        });
        setMovie(!movie);
        setOpenAdd(false);
        setScreenValue([]);
        setCategoryValue([]);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoImage = async (e: any, setValue: Dispatch<SetStateAction<string>>) => {
    if (e.target.files[0] && e.target.files[0].type.includes('image')) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `images/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: string) => setValue(url));
    } else if (e.target.files[0] && e.target.files[0].type.includes('video')) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `videos/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: string) => setValue(url));
    }
  };

  const handleCategory = (e: any) => {
    if (e.target.checked && screenValue.filter((value: string) => e.target.value !== value)) {
      setCategoryValue([...categoryValue, e.target.value]);
    } else {
      setCategoryValue(categoryValue.filter((value: string) => e.target.value !== value));
    }
  };

  const handleScreen = (e: any) => {
    if (e.target.checked && screenValue.filter((value: string) => e.target.value !== value)) {
      setScreenValue([...screenValue, e.target.value]);
    } else {
      setScreenValue(screenValue.filter((value: string) => e.target.value !== value));
    }
  };

  const handleAdd = async () => {
    setOpenAdd(true);
    getCategoryAll()
      .then((res) => setCategoryList(res.values.categories))
      .catch(console.log);
    getDirectorAll()
      .then((res) => setDirectorList(res.values.directors))
      .catch(console.log);
    getScreenAll()
      .then((res) => setScreenList(res.values.screens))
      .catch(console.log);
  };
  return (
    <>
      <S.MovieResult>
        <S.MovieSearch>
          <S.MovieSearchBtn>
            <img src={search} alt="" />
          </S.MovieSearchBtn>
          <S.MovieSearchInput placeholder="Search" />
        </S.MovieSearch>
        <S.MovieAdd onClick={handleAdd}>
          <svg
            height="448pt"
            viewBox="0 0 448 448"
            width="448pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
          </svg>
          Add Movie
        </S.MovieAdd>
        {openAdd && categoryList && directorList && screenList && (
          <Form submit={handleSubmit(handleValue)}>
            <S.Div>
              <S.MovieFormTitle>
                Add Movie
                <img src={x2} alt="" onClick={() => setOpenAdd(false)} role="button" />
              </S.MovieFormTitle>
              <S.MovieForm>
                <S.MovieFormController>
                  <Controller
                    name="name"
                    rules={rules.name}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="name"
                        title="Tên Film"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="name" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="moveDuration"
                    rules={rules.time}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="moveDuration"
                        title="Thời lượng"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="moveDuration" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="directorId"
                    rules={rules.daodien}
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        List={directorList}
                        change={field.onChange}
                        title="Đạo diễn"
                        name="directorId"
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="directorId" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="cast"
                    rules={rules.dienvien}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="cast"
                        title="Diễn viên"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="cast" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="age"
                    rules={rules.age}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="age"
                        title="Độ tuổi"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="age" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="categoryId"
                    rules={rules.theloai}
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        title="Thể loại"
                        name="categoryId"
                        listCheckbox={categoryList}
                        change={(value) => {
                          field.onChange(value);
                          handleCategory(value);
                        }}
                      />
                    )}
                  />
                  <ErrorMessage name="categoryId" errors={categoryValue.length === 0 && errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="loaiman"
                    rules={rules.loaiman}
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        title="Loại màn hình"
                        name="loaiman"
                        listCheckbox={screenList}
                        change={(value) => {
                          field.onChange(value);
                          handleScreen(value);
                        }}
                      />
                    )}
                  />
                  <ErrorMessage name="loaiman" errors={screenValue.length === 0 && errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="description"
                    rules={rules.content}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="description"
                        title="Nội dung"
                        textarea
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="description" errors={errors} />
                </S.MovieFormController>
              </S.MovieForm>
              <S.MovieForm>
                <S.MovieFormController2>
                  <SingleSelect registration={register('dateStart')} label="Ngày bắt đầu" />
                </S.MovieFormController2>
                <S.MovieFormController2>
                  <SingleSelect registration={register('dateEnd')} label="Ngày kết thúc" />
                </S.MovieFormController2>
              </S.MovieForm>
              <S.MovieForm>
                <S.MovieFormController2>
                  <Controller
                    name="image"
                    rules={rules.image}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        url={getValues('image')}
                        name="image"
                        error={errors}
                        type="file"
                        title="Image URL"
                        change={(value) => handleVideoImage(value, field.onChange)}
                      />
                    )}
                  />
                  <ErrorMessage name="image" errors={errors} />
                </S.MovieFormController2>
                <S.MovieFormController2>
                  <Controller
                    name="trailer"
                    rules={rules.trailer}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        url={getValues('trailer')}
                        name="trailer"
                        error={errors}
                        type="file"
                        title="Trailer URL"
                        change={(value) => handleVideoImage(value, field.onChange)}
                      />
                    )}
                  />
                  <ErrorMessage name="trailer" errors={errors} />
                </S.MovieFormController2>
              </S.MovieForm>
            </S.Div>
            <S.Div>
              <S.MovieFormListBtn>
                <S.MovieFormBtn
                  type="button"
                  onClick={() => {
                    setOpenAdd(false);
                  }}
                >
                  Cancel
                </S.MovieFormBtn>
                <S.MovieFormBtn>Create</S.MovieFormBtn>
              </S.MovieFormListBtn>
            </S.Div>
          </Form>
        )}
      </S.MovieResult>
      <S.Movie>
        <S.MovieListTitle>
          <S.MovieTitle>List Movie</S.MovieTitle>
          <MoviePagination filters={filters} setIsLoading={setIsLoading} />
        </S.MovieListTitle>
        <S.MovieList>
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((item, index) => <MovieSkeletion key={index} />)
          ) : (
            <MovieItem setMovie={setMovie} movie={movie} />
          )}
        </S.MovieList>
      </S.Movie>
    </>
  );
};
