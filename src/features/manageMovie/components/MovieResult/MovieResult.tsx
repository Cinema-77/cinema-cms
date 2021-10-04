import React, { useEffect, useState } from 'react';
import * as S from './MovieResult.style';
import search from '@/assets/icon/search.svg';
import { InputField, ErrorMessage, Form, SelectField } from '@/components/Form2';
import { Controller, useForm } from 'react-hook-form';
import { rules } from '@/utils/rules';
import x2 from '@/assets/icon/x2.svg';
import { MovieType } from '../../type';
import { createMovie } from '../../api/createMovie';
import { getCategoryAll } from '../../api/category';
import { getDirectorAll } from '../../api/director';
import { CheckboxField } from '@/components/Form2/CheckboxField/CheckboxField';
import { getScreenAll } from '../../api/screen';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { MovieList } from '@/features/manageMovie';

interface MovieResultProps {}

export const MovieResult: React.FC<MovieResultProps> = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [directorList, setDirectorList] = useState([]);
  const [screenList, setScreenList] = useState([]);
  const [screenValue, setScreenValue] = useState<any>([]);
  const [categoryValue, setCategoryValue] = useState<any>([]);
  const [urlIMG, setUrlIMG] = useState<any>('');
  const [urlVideo, setUrlVideo] = useState<any>('');

  const {
    control,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    getCategoryAll().then((res: any) => setCategoryList(res.values.categories));
    getDirectorAll().then((res: any) => setDirectorList(res.values.directors));
    getScreenAll().then((res: any) => setScreenList(res.values.screens));
  }, []);
  const handleValue = async (data: MovieType) => {
    const body = {
      name: data.name,
      moveDuration: data.moveDuration,
      image: urlIMG,
      trailer: urlVideo,
      age: data.age,
      description: data.description,
      directorId: data.directorId,
      cast: data.cast,
      screensId: screenValue,
      categoryId: categoryValue,
    };
    console.log(body);
    try {
      await createMovie(body)
        .then((data) => console.log(data))
        .catch((error) => console.log(error.response));
      setOpenAdd(false);
      setUrlIMG('');
      setUrlVideo('');
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (e: any) => {
    if (e.target.files && e.target.files[0].type.includes('image')) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `images/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: any) => setUrlIMG(url));
    }
  };

  const handleVideoChange = async (e: any) => {
    if (e.target.files && e.target.files[0].type.includes('video')) {
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

  return (
    <>
      <S.MovieResult>
        <S.MovieSearch>
          <S.MovieSearchBtn>
            <img src={search} alt="" />
          </S.MovieSearchBtn>
          <S.MovieSearchInput placeholder="Search" />
        </S.MovieSearch>
        <S.MovieAdd onClick={() => setOpenAdd(true)}>
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
        {openAdd && (
          <Form submit={handleSubmit(handleValue)}>
            <S.MovieFormTitle>
              Add Movie
              <img src={x2} alt="" onClick={() => setOpenAdd(false)} />
            </S.MovieFormTitle>
            <S.MovieForm>
              <S.MovieFormController>
                <Controller
                  name="name"
                  control={control}
                  rules={rules.name}
                  render={({ field }) => (
                    <InputField
                      name="name"
                      title="Tên Film"
                      change={field.onChange}
                      value={getValues('name')}
                    />
                  )}
                />
                <ErrorMessage name="name" errors={errors} />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="moveDuration"
                  control={control}
                  rules={rules.time}
                  render={({ field }) => (
                    <InputField
                      name="moveDuration"
                      title="Thời lượng"
                      change={field.onChange}
                      value={getValues('moveDuration')}
                    />
                  )}
                />
                <ErrorMessage name="moveDuration" errors={errors} />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="directorId"
                  control={control}
                  rules={rules.daodien}
                  render={({ field }) => (
                    <SelectField
                      List={directorList}
                      change={field.onChange}
                      title="Đạo diễn"
                      name="directorId"
                    />
                  )}
                />
                <ErrorMessage name="directorId" errors={errors} />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="cast"
                  control={control}
                  rules={rules.dienvien}
                  render={({ field }) => (
                    <InputField name="cast" title="Diễn viên" change={field.onChange} />
                  )}
                />
                <ErrorMessage name="cast" errors={errors} />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="age"
                  control={control}
                  rules={rules.age}
                  render={({ field }) => (
                    <InputField name="age" title="Độ tuổi" change={field.onChange} />
                  )}
                />
                <ErrorMessage name="age" errors={errors} />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={rules.theloai}
                  render={({ field }) => (
                    <CheckboxField
                      title="Thể loại"
                      name="categoryId"
                      listCheckbox={categoryList}
                      change={(value: any) => {
                        field.onChange(value);
                        handleCategory(value);
                      }}
                    />
                  )}
                />
                <ErrorMessage name="categoryId" errors={errors} />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="loaiman"
                  control={control}
                  rules={rules.loaiman}
                  render={({ field }) => (
                    <CheckboxField
                      title="Loại màn hình"
                      name="loaiman"
                      listCheckbox={screenList}
                      change={(value: any) => {
                        field.onChange(value);
                        handleScreen(value);
                      }}
                    />
                  )}
                />
                <ErrorMessage name="loaiman" errors={errors} />
              </S.MovieFormController>
              <S.MovieFormController>
                <Controller
                  name="description"
                  control={control}
                  rules={rules.content}
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
                <ErrorMessage name="description" errors={errors} />
              </S.MovieFormController>
            </S.MovieForm>
            <S.MovieForm>
              <S.MovieFormController2>
                <Controller
                  name="image"
                  control={control}
                  rules={rules.image}
                  render={({ field }) => (
                    <InputField
                      url={urlIMG}
                      name="image"
                      type="file"
                      title="Image URL"
                      change={(value) => {
                        field.onChange(value);
                        handleImageChange(value);
                      }}
                    />
                  )}
                />

                <ErrorMessage name="image" errors={errors} />
              </S.MovieFormController2>
              <S.MovieFormController2>
                <Controller
                  name="trailer"
                  control={control}
                  rules={rules.trailer}
                  render={({ field }) => (
                    <InputField
                      url={urlVideo}
                      name="trailer"
                      type="file"
                      title="Trailer URL"
                      change={(value) => {
                        field.onChange(value);
                        handleVideoChange(value);
                      }}
                    />
                  )}
                />
                <ErrorMessage name="trailer" errors={errors} />
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
      <MovieList />
    </>
  );
};
