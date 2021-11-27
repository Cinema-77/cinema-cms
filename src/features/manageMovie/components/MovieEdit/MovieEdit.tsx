import { useToast } from '@chakra-ui/toast';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import qs from 'query-string';
import React, { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

import { getCategoryAll, getDirectorAll, getScreenAll, updateMovie } from '../..';
import { categoryType, MovieItemType, MovieType } from '../../type';
import * as S from '../MovieResult/MovieResult.style';

import x2 from '@/assets/icon/x2.svg';
import { SingleSelect } from '@/components';
import { InputField, Form, SelectField } from '@/components/Form2';
import { CheckboxField } from '@/components/Form2/CheckboxField/CheckboxField';
import { storage } from '@/lib/firebase';

interface MovieEditProps {
  movieValue: MovieItemType;
  setMovieValue: any;
  setMovie: any;
  movie: any;
}

export const MovieEdit: React.FC<MovieEditProps> = ({
  movieValue,
  setMovieValue,
  setMovie,
  movie,
}) => {
  const idCategory: any[] = [];
  const idScreens: any[] = [];

  for (let i = 0; i < movieValue.categories.length; i++) {
    idCategory.push(movieValue.categories[i]._id);
  }
  for (let i = 0; i < movieValue.screens.length; i++) {
    idScreens.push(movieValue.screens[i]._id);
  }

  const [screenValue, setScreenValue] = useState<string[]>([...idScreens]);
  const [categoryValue, setCategoryValue] = useState<string[]>([...idCategory]);
  const [urlIMG, setUrlIMG] = useState<string>(movieValue.image);
  const [urlVideo, setUrlVideo] = useState<string>(movieValue.trailer);
  const [name, setName] = useState<string>(movieValue.name);
  const [moveDuration, setMovieDuration] = useState<number>(movieValue.moveDuration);
  const [description, setDescription] = useState<string>(movieValue.description);
  const [cast, setCast] = useState<string>(movieValue.cast);
  const [age, setAge] = useState<number>(movieValue.age);
  const [director, setDirector] = useState(movieValue.director._id);
  const [categoryList, setCategoryList] = useState<categoryType[]>([]);
  const [directorList, setdirectorList] = useState<any>();
  const [screenList, setScreenList] = useState([]);
  const { control, handleSubmit, register } = useForm({
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
      dateStart: movieValue.dateStart,
      dateEnd: movieValue.dateEnd,
    },
  });
  const location = useLocation();
  const query = useMemo(() => qs.parse(location.search), [location.search]);
  const history = useHistory();
  const toast = useToast();
  const handleValue = async (data: MovieType) => {
    console.log(data);
    const body = {
      name: name,
      moveDuration: moveDuration,
      image: urlIMG,
      trailer: urlVideo,
      description: description,
      directorId: director,
      cast: cast,
      age: age,
      screensId: screenValue,
      categoryId: categoryValue,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    };
    try {
      if (categoryValue.length === 0 || screenValue.length === 0 || !body.description) {
        toast({
          title: 'Vui lòng nhập đầy đủ các trường',
          position: 'top-right',
          status: 'error',
          duration: 3000,
        });
        return;
      }
      const res = await updateMovie(query.id, body);
      if (res.success === false) {
        if (res.errors.name) {
          toast({
            title: res.errors.name,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
        if (res.errors.moveDuration) {
          toast({
            title: res.errors.moveDuration,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
        if (res.errors.age) {
          toast({
            title: res.errors.age,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
        if (res.errors.directorId) {
          toast({
            title: res.errors.directorId,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
        if (res.errors.image) {
          toast({
            title: res.errors.image,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
        if (res.errors.cast) {
          toast({
            title: res.errors.cast,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
        if (res.errors.trailer) {
          toast({
            title: res.errors.trailer,
            position: 'top-right',
            status: 'error',
            duration: 3000,
          });
        }
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
        toast({ title: res.message, position: 'top-right', status: 'success', duration: 3000 });
        history.push('/app/managemovie');
        setMovieValue('');
        setMovie(!movie);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryAll()
      .then((res: any) => setCategoryList(res.values.categories))
      .catch((err) => console.log(err));
    getDirectorAll()
      .then((res: any) => setdirectorList(res.values.directors))
      .catch((err) => console.log(err));
    getScreenAll()
      .then((res: any) => setScreenList(res.values.screens))
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <>
      {movieValue && screenList && categoryList && directorList && (
        <Form submit={handleSubmit(handleValue)}>
          <S.MovieFormTitle>
            Edit Movie
            <img src={x2} alt="asdsd" onClick={() => setMovieValue('')} role="button" />
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
                    change={(e: any) => {
                      field.onChange(e);
                      setName(e.target.value);
                    }}
                    value={name}
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
                    change={(e: any) => {
                      field.onChange(e);
                      setMovieDuration(e.target.value);
                    }}
                    value={moveDuration}
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
                    change={(e: any) => {
                      field.onChange(e);
                      setDirector(e.target.value);
                    }}
                    title="Đạo diễn"
                    name="directorId"
                    value={director}
                  />
                )}
              />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="cast"
                control={control}
                render={({ field }) => (
                  <InputField
                    name="cast"
                    title="Diễn viên"
                    change={(e: any) => {
                      field.onChange(e);
                      setCast(e.target.value);
                    }}
                    value={cast}
                  />
                )}
              />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <InputField
                    name="age"
                    title="Độ tuổi"
                    change={(e: any) => {
                      field.onChange(e);
                      setAge(Number(e.target.value));
                    }}
                    value={age}
                  />
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
                    value={categoryValue}
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
                    value={screenValue}
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
                    change={(e: any) => {
                      field.onChange(e);
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                )}
              />
            </S.MovieFormController>
          </S.MovieForm>
          <S.MovieForm>
            <S.MovieFormController2>
              <SingleSelect
                registration={register('dateStart')}
                defaultValue={movieValue.dateStart}
                label="Ngày bắt đầu"
              />
            </S.MovieFormController2>
            <S.MovieFormController2>
              <SingleSelect
                registration={register('dateEnd')}
                defaultValue={movieValue.dateEnd}
                label="Ngày kết thúc"
              />
            </S.MovieFormController2>
          </S.MovieForm>
          <S.MovieForm>
            <S.MovieFormController2>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <InputField
                    url={urlIMG ? urlIMG : movieValue.image}
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
            <S.MovieFormBtn onClick={() => setMovieValue('')} type="button">
              Cancel
            </S.MovieFormBtn>
            <S.MovieFormBtn>Update</S.MovieFormBtn>
          </S.MovieFormListBtn>
        </Form>
      )}
    </>
  );
};
