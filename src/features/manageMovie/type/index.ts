export interface MovieType {
  name: string;
  moveDuration: string;
  image: string;
  trailer: string;
  description: string;
  directorId: string;
  cast: string;
  screensId: string[];
  categoryId: string[];
  age: number;
}

export interface MovieItemType {
  _id: string;
  name: string;
  moveDuration: string;
  image: string;
  trailer: string;
  description: string;
  director: {
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
  };
  cast: string;
  age: number;
  categories: {
    _id: string;
    name: string;
    image: string;
  }[];
  screens: {
    _id: string;
    name: string;
    weekdayPrice: number;
    weekendPrice: number;
  }[];
}

export interface MovieRespon {
  success: boolean;
  message: string;
  value: {
    movie: MovieType;
  };
}
