import { createSlice } from "@reduxjs/toolkit";
import { getUserSearchHistory } from "../asyncThunks/userAsyncThunk";

const initialState: UserSlice = {
  searchHistory: {
    items: [],
    loading: false,
    error: false,
  },
  selectedPlaylistId: null,
  reviews: {
    items: [],
    loading: false,
    error: false,
    selectedReview: {
      id: 1,
      emoji: "/images/reviews/rate-5.webp",
      text: "Tuyệt vời",
      value: 10,
    },
    reviewContent: "",
  },
  comments: {
    items: [],
    loading: false,
    error: false,
  },
  report: {
    reportError: "",
    reportDescription: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedPlaylistId: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
    setSelectedReview: (state, action) => {
      state.reviews.selectedReview = action.payload;
    },
    setReviewContent: (state, action) => {
      state.reviews.reviewContent = action.payload;
    },
    setReportError: (state, action) => {
      state.report.reportError = action.payload;
    },
    setReportDescription: (state, action) => {
      state.report.reportDescription = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserSearchHistory.pending, (state) => {
      state.searchHistory.loading = true;
      state.searchHistory.error = false;
    });

    builder.addCase(getUserSearchHistory.fulfilled, (state, action) => {
      state.searchHistory.loading = false;
      state.searchHistory.items = action.payload.result;
    });

    builder.addCase(getUserSearchHistory.rejected, (state) => {
      state.searchHistory.loading = false;
      state.searchHistory.error = true;
    });
  },
});

export const {
  setSelectedPlaylistId,
  setSelectedReview,
  setReviewContent,
  setReportError,
  setReportDescription,
} = userSlice.actions;

export default userSlice.reducer;
