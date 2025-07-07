import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDataSlideShow = createAsyncThunk(
  "movie/fetchDataSlideShow",
  async () => {
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbx1W0Z5YhEl65BR458R3waIsUWjDbGpJF2fe60OlV_TK8HolI_UiFBbiqtYlS4e9jYnfQ/exec`
    );
    return response.json();
  }
);

// ==================== Fetch data movie ==================== //
interface FetchDataMovie {
  type:
    | "phim-le"
    | "phim-bo"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng"
    | Categories
    | Countries;
  describe: "danh-sach" | "quoc-gia" | "the-loai";
  params?: {
    limit?: number;
    page?: number;
  };
}

export const fetchDataMovie = createAsyncThunk(
  "movie/fetchDataMovie",
  async (
    {
      type,
      describe = "danh-sach",
      params = { limit: 10, page: 1 },
    }: FetchDataMovie,
    { rejectWithValue }
  ) => {
    try {
      const _params = new URLSearchParams({
        page: (params.page ?? 1).toString(),
        limit: (params.limit ?? 10)?.toString(),
      });

      const response = await fetch(
        `${API_URL}v1/api/${describe}/${type}&${_params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Fetch failed");
      }

      const data = await response.json();

      return {
        res: data,
        type,
      };
    } catch (error: any) {
      // vào hàm fechaDataMovie.redirect
      return rejectWithValue({
        error: error.message,
        type,
      });
    }
  }
);

// ==================== Fetch data movie detail ==================== //
export type Describe = "danh-sach" | "the-loai" | "quoc-gia";
interface FetchDataMovieDetail {
  describe: Describe;
  slug: string;
  page: number;
  limit?: number;
}

export const fetchDataMovieDetail = createAsyncThunk(
  "movie/fetchDataMovieDetail",
  async (
    { describe, slug, page = 1, limit = 24 }: FetchDataMovieDetail,
    { rejectWithValue }
  ) => {
    try {
      const _params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(
        `${API_URL}v1/api/${describe}/${slug}&${_params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Fetch failed");
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

// ==================== Fetch data movie preview ==================== //
interface FetchDataMoviePreview {
  keyword: string;
  limit: number;
}

export const fetchDataMoviePreview = createAsyncThunk(
  "movie/fetchDataMoviePreview",
  async ({ keyword, limit }: FetchDataMoviePreview, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        keyword,
        limit: limit.toString(),
      });

      const response = await fetch(
        `${API_URL}v1/api/tim-kiem&${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Fetch failed");
      }

      return response.json();
    } catch (error: any) {
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);
// ==================== Fetch data movie search ==================== //
interface FetchDataMovieSearch {
  keyword: string;
  page: number;
  limit: number;
  sort_lang?: "long-tieng" | "thuyet-minh" | "vietsub" | "";
  category?: Categories | "";
  country?: Countries | "";
  year?: number | "";
  sort_type?: "asc" | "desc";
}

export const fetchDataMovieSearch = createAsyncThunk(
  "movie/fetchDataMovieSearch",
  async (
    {
      keyword,
      page = 1,
      limit = 24,
      sort_lang = "",
      category = "",
      country = "",
      year = "",
      sort_type = "desc",
    }: FetchDataMovieSearch,
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        keyword,
        page: page.toString(),
        limit: limit.toString(),
        sort_lang,
        category,
        country,
        year: year.toString(),
        sort_type,
      });

      const response = await fetch(
        `${API_URL}v1/api/tim-kiem&${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Fetch failed");
      }

      return response.json();
    } catch (error: any) {
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

// ==================== Fetch data movie info ==================== //
interface FetchMovieInfo {
  slug: string;
  page: "watching" | "info";
}

export const fetchDataMovieInfo = createAsyncThunk(
  "movie/fetchMovieInfo",
  async ({ slug, page }: FetchMovieInfo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}phim/${slug}`);

      if (!response.ok) {
        throw new Error("Fetch failed");
      }

      const data = await response.json();

      if (!data?.status) {
        console.log("error");
        throw new Error("Fetch failed");
      }

      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue({
        error: error.message,
        page,
      });
    }
  }
);
