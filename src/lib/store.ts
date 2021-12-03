import { configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line no-restricted-imports
import movieReducer from '@/features/manageMovie/components/MovieSlice';

const rootReducer = {
  movie: movieReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
