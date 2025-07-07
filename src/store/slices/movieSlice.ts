import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDataSlideShow,
  fetchDataMovie,
  fetchDataMoviePreview,
  fetchDataMovieDetail,
  fetchDataMovieSearch,
  fetchDataMovieInfo,
} from "../asyncThunks/movieAsyncThunk";

const data = {
  items: [],
  loading: false,
  error: false,
};

const initialState: MovieSlice = {
  slideShows: data,
  movieData: {},
  searchMoviePreview: {
    items: [],
    totalItems: 0,
    loading: false,
    error: false,
  },
  movieInfo: {
    movie: null,
    episodes: null,
    currentEpisode: null,
    loading: false,
    error: false,
  },
  movieDetail: {
    items: null,
    titlePage: "",
    pagination: null,
    loading: false,
    error: false,
  },
  searchMovie: {
    items: [],
    loading: false,
    error: false,
    titlePage: "",
    pagination: {
      totalItems: 0,
      totalItemsPerPage: 0,
      currentPage: 0,
      totalPages: 0,
    },
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCurrentEpisode: (state, action) => {
      state.movieInfo.currentEpisode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataSlideShow.pending, (state, action) => {
      state.slideShows.loading = true;
      state.slideShows.error = false;
    });
    builder.addCase(fetchDataSlideShow.fulfilled, (state, action) => {
      state.slideShows.loading = false;
      state.slideShows.items = action.payload?.items ?? [];
      state.slideShows.error = false;
    });
    builder.addCase(fetchDataSlideShow.rejected, (state, action) => {
      state.slideShows.loading = false;
      state.slideShows.error = true;
    });
    builder.addCase(fetchDataMovie.pending, (state, action) => {
      const { type } = action.meta.arg;

      state.movieData[type] = {
        loading: true,
        items: [],
        error: false,
      };
    });
    builder.addCase(fetchDataMovie.fulfilled, (state, action) => {
      const { type } = action.payload;
      state.movieData[type].loading = false;
      state.movieData[type].items = action.payload?.res?.data?.items ?? [];
    });
    builder.addCase(fetchDataMovie.rejected, (state, action: any) => {
      const { type } = action.meta.arg;
      state.movieData[type].loading = false;
      state.movieData[type].error = true;
    });

    builder.addCase(fetchDataMoviePreview.pending, (state, action) => {
      state.searchMoviePreview.loading = true;
      state.searchMoviePreview.error = false;
    });
    builder.addCase(fetchDataMoviePreview.fulfilled, (state, action) => {
      state.searchMoviePreview.loading = false;
      state.searchMoviePreview.items = action.payload?.data?.items ?? [];
      state.searchMoviePreview.totalItems =
        action.payload?.data?.params?.pagination?.totalItems ?? 0;
      state.searchMoviePreview.error = false;
    });
    builder.addCase(fetchDataMoviePreview.rejected, (state, action) => {
      state.searchMoviePreview.loading = false;
      state.searchMoviePreview.error = true;
    });

    builder.addCase(fetchDataMovieDetail.pending, (state, action) => {
      state.movieDetail.loading = true;
      state.movieDetail.error = false;
    });
    builder.addCase(fetchDataMovieDetail.fulfilled, (state, action) => {
      state.movieDetail.loading = false;
      state.movieDetail.titlePage = action.payload?.data?.titlePage;
      state.movieDetail.items = action.payload?.data?.items;
      state.movieDetail.pagination = action.payload?.data?.params?.pagination;
      state.movieDetail.error = false;
    });
    builder.addCase(fetchDataMovieDetail.rejected, (state, action) => {
      state.movieDetail.loading = false;
      state.movieDetail.error = true;
    });

    builder.addCase(fetchDataMovieSearch.pending, (state, action) => {
      state.searchMovie.loading = true;
      state.searchMovie.error = false;
    });
    builder.addCase(fetchDataMovieSearch.fulfilled, (state, action) => {
      state.searchMovie.loading = false;
      state.searchMovie.items = action.payload?.data?.items ?? [];
      state.searchMovie.titlePage = action.payload?.data?.titlePage;
      state.searchMovie.pagination = action.payload?.data?.params?.pagination;
      state.searchMovie.error = false;
    });
    builder.addCase(fetchDataMovieSearch.rejected, (state, action) => {
      state.searchMovie.loading = false;
      state.searchMovie.error = true;
    });

    builder.addCase(fetchDataMovieInfo.pending, (state, action) => {
      state.movieInfo.loading = true;
      state.movieInfo.error = false;
    });
    builder.addCase(fetchDataMovieInfo.fulfilled, (state, action) => {
      state.movieInfo.loading = false;
      state.movieInfo.movie = action.payload?.movie;
      state.movieInfo.episodes = action.payload?.episodes;
      state.movieInfo.error = false;
    });
    builder.addCase(fetchDataMovieInfo.rejected, (state, action) => {
      state.movieInfo.loading = false;
      state.movieInfo.error = true;
    });
  },
});

export const { setCurrentEpisode } = movieSlice.actions;
export default movieSlice.reducer;
