import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AnimeDetail {
  id: number;
  title: string;
  image?: string;
  year?: number;
  score?: number;
  episodes?: number;
  status?: string;
  synopsis?: string;
  genres?: string[];
  studios?: string[];
  season?: string;
  airedFrom?: string;
  airedTo?: string;
  source?: string;
  duration?: string;
  rating?: string;
}

interface AnimeDetailState {
  anime: AnimeDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnimeDetailState = {
  anime: null,
  isLoading: false,
  error: null,
};

export const fetchAnimeDetail = createAsyncThunk(
  'animeDetail/fetch',
  async (animeId: string) => {
    const response = await fetch(`/api/anime/${animeId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    if (!data || !data.id || !data.title) {
      throw new Error('Invalid anime data received from API');
    }
    
    return data;
  }
);

export const animeDetailSlice = createSlice({
  name: 'animeDetail',
  initialState,
  reducers: {
    clearAnimeDetail: (state) => {
      state.anime = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.anime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch anime details';
        state.anime = null;
      });
  },
});

export const { clearAnimeDetail } = animeDetailSlice.actions;

export const selectAnime = (state: RootState) => state.animeDetail.anime;
export const selectIsLoading = (state: RootState) => state.animeDetail.isLoading;
export const selectError = (state: RootState) => state.animeDetail.error;

export default animeDetailSlice.reducer;

