import { configureStore } from '@reduxjs/toolkit';
import searchAnimeReducer from './features/searchAnimeSlice';
import animeDetailReducer from './features/animeDetailSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      searchAnime: searchAnimeReducer,
      animeDetail: animeDetailReducer,
    },
  });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

