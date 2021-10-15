import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { categoryType, MovieItemType, MovieType } from '../../type';

import * as S from './MovieResult.style';

import search from '@/assets/icon/search.svg';
import x2 from '@/assets/icon/x2.svg';
import { InputField, Form, SelectField } from '@/components/Form2';
import { CheckboxField } from '@/components/Form2/CheckboxField/CheckboxField';
import {
  MovieItem,
  getCategoryAll,
  createMovie,
  deleteMovie,
  getDirectorAll,
  getMovieAll,
  getScreenAll,
} from '@/features/manageMovie';
import { storage } from '@/lib/firebase';

interface MovieResultProps {
  children?: React.ReactNode;
}

export const MovieResult: React.FC<MovieResultProps> = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [categoryList, setCategoryList] = useState<categoryType[]>([]);
  const [directorList, setDirectorList] = useState<any>();
  const [screenList, setScreenList] = useState([]);
  const [screenValue, setScreenValue] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [urlIMG, setUrlIMG] = useState<string>('');
  const [urlVideo, setUrlVideo] = useState<string>('');
  const [movieList, setMovieList] = useState<MovieItemType[]>([]);
  const [movie, setMovie] = useState(false);
  const { control, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      moveDuration: '',
      categoryId: '',
      directorId: '',
      cast: '',
      description: '',
      loaiman: '',
      image: '',
      trailer: '',
      age: '',
    },
  });
  useEffect(() => {
    getMovieAll()
      .then((res: any) => setMovieList(res.values.movies))
      .catch((err) => console.log(err));
  }, [movie]);

  const handleValue = async (data: MovieType) => {
    const body = {
      name: data.name,
      moveDuration: data.moveDuration,
      image: urlIMG,
      trailer: urlVideo,
      description: data.description,
      directorId: data.directorId,
      cast: data.cast,
      age: Number(data.age),
      screensId: screenValue,
      categoryId: categoryValue,
    };
    try {
      const res = await createMovie(body);
      console.log(res);
      setMovie(!movie);
      setOpenAdd(false);
      setUrlIMG('');
      setUrlVideo('');
      setScreenValue([]);
      setCategoryValue([]);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (e: any) => {
    if (e.target.files[0] && e.target.files[0].type.includes('image')) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `images/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: any) => setUrlIMG(url));
    }
  };

  const handleVideoChange = async (e: any) => {
    if (e.target.files[0] && e.target.files[0].type.includes('video')) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `videos/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: any) => setUrlVideo(url));
    }
  };

  const handleCategory = (e: any) => {
    if (e.target.checked && screenValue.filter((value: any) => e.target.value !== value)) {
      setCategoryValue([...categoryValue, e.target.value]);
    } else {
      setCategoryValue(categoryValue.filter((value: any) => e.target.value !== value));
    }
  };

  const handleScreen = (e: any) => {
    if (e.target.checked && screenValue.filter((value: any) => e.target.value !== value)) {
      setScreenValue([...screenValue, e.target.value]);
    } else {
      setScreenValue(screenValue.filter((value: any) => e.target.value !== value));
    }
  };

  const handleDeleteMovie = async (id: string) => {
    console.log(id);
    await deleteMovie(id);
    setMovieList(movieList.filter((movie) => movie._id !== id));
  };

  const handleAdd = async () => {
    setOpenAdd(true);
    getCategoryAll()
      .then((res: any) => setCategoryList(res.values.categories))
      .catch((err) => console.log(err));
    getDirectorAll()
      .then((res: any) => setDirectorList(res.values.directors))
      .catch((err) => console.log(err));
    getScreenAll()
      .then((res: any) => setScreenList(res.values.screens))
      .catch((err) => console.log(err));
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
            <S.MovieFormTitle>
              Add Movie
              <img src={x2} alt="" onClick={() => setOpenAdd(false)} role="button" />
            </S.MovieFormTitle>
            <S.MovieForm>
              <S.MovieFormController>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      name="name"
                      title="Tên Film"
                      change={field.onChange}
                      value={getValues('name')}
                    />
                  )}
                />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="moveDuration"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      name="moveDuration"
                      title="Thời lượng"
                      change={field.onChange}
                      value={getValues('moveDuration')}
                    />
                  )}
                />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="directorId"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      List={directorList}
                      change={field.onChange}
                      title="Đạo diễn"
                      name="directorId"
                    />
                  )}
                />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="cast"
                  control={control}
                  render={({ field }) => (
                    <InputField name="cast" title="Diễn viên" change={field.onChange} />
                  )}
                />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <InputField name="age" title="Độ tuổi" change={field.onChange} />
                  )}
                />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <CheckboxField
                      title="Thể loại"
                      name="categoryId"
                      listCheckbox={categoryList}
                      change={(value: ChangeEventHandler) => {
                        field.onChange(value);
                        handleCategory(value);
                      }}
                    />
                  )}
                />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="loaiman"
                  control={control}
                  render={({ field }) => (
                    <CheckboxField
                      title="Loại màn hình"
                      name="loaiman"
                      listCheckbox={screenList}
                      change={(value: ChangeEventHandler) => {
                        field.onChange(value);
                        handleScreen(value);
                      }}
                    />
                  )}
                />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      name="description"
                      title="Nội dung"
                      textarea
                      change={field.onChange}
                      value={getValues('description')}
                    />
                  )}
                />
              </S.MovieFormController>
            </S.MovieForm>
            <S.MovieForm>
              <S.MovieFormController2>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      url={urlIMG}
                      name="image"
                      type="file"
                      title="Image URL"
                      change={(value: any) => {
                        field.onChange(value);
                        handleImageChange(value);
                      }}
                    />
                  )}
                />
              </S.MovieFormController2>
              <S.MovieFormController2>
                <Controller
                  name="trailer"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      url={urlVideo}
                      name="trailer"
                      type="file"
                      title="Trailer URL"
                      change={(value: any) => {
                        field.onChange(value);
                        handleVideoChange(value);
                      }}
                    />
                  )}
                />
              </S.MovieFormController2>
            </S.MovieForm>
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
          </Form>
        )}
      </S.MovieResult>
      <S.Movie>
        <S.MovieTitle>List Movie</S.MovieTitle>
        <S.MovieList>
          <MovieItem
            movieList={movieList}
            handleDeleteMovie={handleDeleteMovie}
            setMovie={setMovie}
            movie={movie}
          />
        </S.MovieList>
      </S.Movie>
    </>
  );
};
