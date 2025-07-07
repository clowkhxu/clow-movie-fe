import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async ({ movieSlug, type, limit }: GetFeedbacks) => {
    const params = new URLSearchParams({
      movieSlug,
      limit: limit.toString(),
      type,
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/list?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

// ========================= GET MORE FEEDBACK =========================

export const getMoreFeedbacks = createAsyncThunk(
  "feedback/getMoreFeedbacks",
  async ({ movieSlug, type, limit, afterTime }: GetMoreFeedbacks) => {
    const params = new URLSearchParams({
      movieSlug,
      limit: limit.toString(),
      type,
      afterTime: afterTime.toString(),
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/list?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch more feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

// ========================= REPLY =========================

export const getReplyListFeedback = createAsyncThunk(
  "feedback/getReplyListFeedback",
  async ({ parentId, limit, type }: GetReplyListFeedback) => {
    if (!parentId) return;

    const params = new URLSearchParams({
      parentId,
      limit: limit.toString(),
      type,
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/replyList?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reply feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

export const getMoreReplyListFeedback = createAsyncThunk(
  "feedback/getMoreReplyListFeedback",
  async ({ parentId, limit, type, afterTime }: GetMoreReplyListFeedback) => {
    const params = new URLSearchParams({
      parentId,
      limit: limit.toString(),
      type,
      afterTime: afterTime.toString(),
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/replyList?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch more reply feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

// ========================= VOTE =========================
export const getVoteListFeedback = createAsyncThunk(
  "feedback/getVoteListFeedback",
  async (movieSlug: string) => {
    const response = await fetch(
      `${BACKEND_URL}/feedback/voteList?movieSlug=${movieSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vote feedbacks");
    }

    const data = await response.json();

    return data;
  }
);
