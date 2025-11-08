import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Anime {
  id: number;
  title: string;
  image: string;
  year: number;
  score: number;
  episodes: number;
  status: string;
  synopsis: string;
  genres?: string[];
}

interface FilterOptions {
  query: string;
  type: string;
  status: string;
  rating: string;
  minScore: string;
  maxScore: string;
  genres: string;
  orderBy: string;
  sort: string;
  startDate: string;
  endDate: string;
  producers: string;
  letter: string;
  sfw: string;
  unapproved: boolean;
}

interface PaginationInfo {
  currentPage: number;
  lastVisiblePage: number;
  hasNextPage: boolean;
}

interface AnimeSearchState {
  searchQuery: string;
  animeList: Anime[];
  currentPage: number;
  totalResults: number;
  totalPages: number;
  isLoading: boolean;
  showAllFilters: boolean;
  filters: FilterOptions;
  error: string | null;
  pagination: PaginationInfo | null;
  hasSearched: boolean;
}

const initialState: AnimeSearchState = {
  searchQuery: '',
  animeList: [],
  currentPage: 1,
  totalResults: 0,
  totalPages: 1,
  isLoading: false,
  showAllFilters: false,
  filters: {
    query: '',
    type: 'all',
    status: 'all',
    rating: 'all',
    minScore: 'all',
    maxScore: 'all',
    genres: 'all',
    orderBy: 'score',
    sort: 'desc',
    startDate: '',
    endDate: '',
    producers: '',
    letter: 'all',
    sfw: 'true',
    unapproved: false,
  },
  error: null,
  pagination: null,
  hasSearched: false,
};

export const searchAnime = createAsyncThunk(
  'searchAnime/search',
  async ({ query, page, filters }: { query: string; page: number; filters: FilterOptions }) => {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      type: filters.type,
      status: filters.status,
      rating: filters.rating,
      minScore: filters.minScore,
      maxScore: filters.maxScore,
      genres: filters.genres,
      orderBy: filters.orderBy,
      sort: filters.sort,
      startDate: filters.startDate,
      endDate: filters.endDate,
      producers: filters.producers,
      letter: filters.letter,
      sfw: filters.sfw,
      unapproved: filters.unapproved.toString(),
    });

    const response = await fetch(`/api/anime?${params.toString()}`);
    const data = await response.json();
    return { 
      results: data.results || [], 
      total: data.total || 0, 
      page,
      pagination: data.pagination || null
    };
  }
);

export const searchAnimeSlice = createSlice({
  name: 'searchAnime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleShowAllFilters: (state) => {
      state.showAllFilters = !state.showAllFilters;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearResults: (state) => {
      state.animeList = [];
      state.totalResults = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.pagination = null;
      state.hasSearched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animeList = action.payload.results;
        state.totalResults = action.payload.total;
        state.currentPage = action.payload.page;
        state.pagination = action.payload.pagination;
        state.totalPages = action.payload.pagination?.lastVisiblePage || 1;
        state.hasSearched = true;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch anime';
        state.animeList = [];
        state.pagination = null;
      });
  },
});

export const { setSearchQuery, setFilters, toggleShowAllFilters, setCurrentPage, clearResults } =
  searchAnimeSlice.actions;

export const selectSearchQuery = (state: RootState) => state.searchAnime.searchQuery;
export const selectAnimeList = (state: RootState) => state.searchAnime.animeList;
export const selectCurrentPage = (state: RootState) => state.searchAnime.currentPage;
export const selectTotalResults = (state: RootState) => state.searchAnime.totalResults;
export const selectTotalPages = (state: RootState) => state.searchAnime.totalPages;
export const selectIsLoading = (state: RootState) => state.searchAnime.isLoading;
export const selectShowAllFilters = (state: RootState) => state.searchAnime.showAllFilters;
export const selectFilters = (state: RootState) => state.searchAnime.filters;
export const selectError = (state: RootState) => state.searchAnime.error;
export const selectPagination = (state: RootState) => state.searchAnime.pagination;
export const selectHasSearched = (state: RootState) => state.searchAnime.hasSearched;

export default searchAnimeSlice.reducer;

