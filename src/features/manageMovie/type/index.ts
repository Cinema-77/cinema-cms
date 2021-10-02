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
}

export interface MovieRespon {
  success: boolean;
  message: string;
  value: {
    movie: MovieType;
  };
}
