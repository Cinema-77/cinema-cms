export interface MovieType {
  name: string;
  moveDuration: number;
  image: string;
  trailer: string;
  description: string;
  directorId: string;
  cast: string;
  screensId: string[];
  categoryId: string[];
  age: number;
}

export interface directorType {
  createAt: string;
  _id: string;
  name: string;
  dateOfBirth: string;
  image: string;
  joinDate: string;
  address: string;
  phoneNumber: string;
  email: string;
  introduce: string;
  male: boolean;
}

export interface categoryType {
  _id: string;
  name: string;
  image: string;
}

export interface screenType {
  _id: string;
  name: string;
  weekdayPrice: number;
  weekendPrice: number;
}

export interface MovieItemType {
  _id: string;
  name: string;
  moveDuration: number;
  image: string;
  trailer: string;
  description: string;
  director: directorType;
  cast: string;
  age: number;
  categories: categoryType[];
  screens: screenType[];
}

export interface MovieRespon {
  success: boolean;
  message: string;
  value: {
    movie: MovieType;
  };
}
