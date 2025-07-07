import { createSlice } from "@reduxjs/toolkit";
import {
  getFeedbacks,
  getMoreFeedbacks,
  getMoreReplyListFeedback,
  getReplyListFeedback,
  getVoteListFeedback,
} from "../asyncThunks/feedbackAsyncThunk";

const initialState: FeedbackSlice = {
  feedbackData: {
    items: [],
    itemCount: 0,
    totalFeedbacks: 0,
    error: false,
    hasMore: false,
    loading: false,
    showFeedbackId: null,
  },
  voteList: {
    userLikedFeedbacks: {},
    userDislikedFeedbacks: {},
  },
  repliesData: {
    data: {},
    showReplyId: null,
  },
  parentId: null,
  replyId: null,
  feedbackType: "comment",
};

const feedbackSlice = createSlice({
  name: "feedbackData",
  initialState,
  reducers: {
    setFeedbackType: (state, action) => {
      state.feedbackType = action.payload;
    },
    setParentId: (state, action) => {
      state.parentId = action.payload;
    },
    setReplyId: (state, action) => {
      state.replyId = action.payload;
    },
    setShowReplyId: (state, action) => {
      state.repliesData.showReplyId = action.payload;
    },
    setShowFeedbackId: (state, action) => {
      state.feedbackData.showFeedbackId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedbacks.pending, (state, action) => {
      state.feedbackData.loading = true;
      state.feedbackData.error = false;
    });

    builder.addCase(getFeedbacks.fulfilled, (state, action) => {
      state.feedbackData.loading = false;
      state.feedbackData.items = action.payload?.result?.items || [];
      state.feedbackData.totalFeedbacks =
        action.payload?.result?.total_feedbacks;
      state.feedbackData.hasMore = action.payload?.result?.has_more ?? false;
      state.feedbackData.itemCount = action.payload?.result?.item_count ?? 0;
      state.feedbackData.error = false;
    });

    builder.addCase(getFeedbacks.rejected, (state, action) => {
      state.feedbackData.loading = false;
      state.feedbackData.error = true;
    });

    builder.addCase(getMoreFeedbacks.pending, (state, action) => {
      state.feedbackData.loading = true;
      state.feedbackData.error = false;
    });

    builder.addCase(getMoreFeedbacks.fulfilled, (state, action) => {
      state.feedbackData.loading = false;
      state.feedbackData.items = [
        ...state.feedbackData.items,
        ...(action.payload?.result?.items || []),
      ];
      state.feedbackData.hasMore = action.payload?.result?.has_more ?? false;
      state.feedbackData.itemCount = action.payload?.result?.item_count ?? 0;
      state.feedbackData.error = false;
    });

    builder.addCase(getMoreFeedbacks.rejected, (state, action) => {
      state.feedbackData.loading = false;
      state.feedbackData.error = true;
    });

    builder.addCase(getReplyListFeedback.pending, (state, action) => {
      const parentId: string = action.meta.arg.parentId;

      state.repliesData.data[parentId] = {
        items: [],
        hasMore: false,
        loading: false,
        error: false,
      };

      state.repliesData.data[parentId].loading = true;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getReplyListFeedback.fulfilled, (state, action) => {
      const parentId = action.meta.arg.parentId;

      if (!state.repliesData.data[parentId]) {
        state.repliesData.data[parentId] = {
          items: [],
          hasMore: false,
          loading: false,
          error: false,
        };
      }

      state.repliesData.data[parentId].loading = false;
      state.repliesData.data[parentId].items =
        action.payload?.result?.items || [];
      state.repliesData.data[parentId].hasMore =
        action.payload?.result?.has_more ?? false;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getReplyListFeedback.rejected, (state, action) => {
      const parentId = action.meta.arg.parentId;

      if (!state.repliesData.data[parentId]) {
        state.repliesData.data[parentId] = {
          items: [],
          hasMore: false,
          loading: false,
          error: false,
        };
      }
      state.repliesData.data[parentId].loading = false;
      state.repliesData.data[parentId].error = true;
    });

    builder.addCase(getMoreReplyListFeedback.pending, (state, action) => {
      const parentId = action.meta.arg.parentId;

      state.repliesData.data[parentId].loading = true;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getMoreReplyListFeedback.fulfilled, (state, action) => {
      const parentId = action.meta.arg.parentId;

      state.repliesData.data[parentId].loading = false;
      state.repliesData.data[parentId].items = [
        ...state.repliesData.data[parentId].items,
        ...(action.payload?.result?.items || []),
      ];
      state.repliesData.data[parentId].hasMore =
        action.payload?.result?.has_more ?? false;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getVoteListFeedback.pending, (state, action) => {
      state.voteList.userLikedFeedbacks = {};
      state.voteList.userDislikedFeedbacks = {};
    });

    builder.addCase(getVoteListFeedback.fulfilled, (state, action) => {
      state.voteList.userLikedFeedbacks =
        action.payload?.result?.user_liked_feedbacks || [];
      state.voteList.userDislikedFeedbacks =
        action.payload?.result?.user_disliked_feedbacks || [];
    });

    builder.addCase(getVoteListFeedback.rejected, (state, action) => {
      state.voteList.userLikedFeedbacks = {};
      state.voteList.userDislikedFeedbacks = {};
    });
  },
});

export const {
  setFeedbackType,
  setParentId,
  setShowReplyId,
  setShowFeedbackId,
  setReplyId,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
