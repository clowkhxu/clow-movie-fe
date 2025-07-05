import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserSearchHistory = createAsyncThunk(
  "user/getUserSearchHistory",
  async ({ userId, accessToken }: GetUserSearchHistory) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/search-history?id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);

// ======================= CREATE USER SEARCH HISTORY =======================

export const createUserSearchHistory = createAsyncThunk(
  "user/createUserSearchHistory",
  async ({ userId, keyword, accessToken }: CreateUserSearchHistory) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/search-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId, keyword }),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);

// ======================= DELETE USER SEARCH HISTORY =======================

export const deleteUserSearchHistory = createAsyncThunk(
  "user/deleteUserSearchHistory",
  async ({ id, userId, accessToken }: DeleteUserSearchHistory) => {
    try {
      const params = new URLSearchParams({
        id,
        userId,
      });

      const response = await fetch(
        `${BACKEND_URL}/user/search-history?${params.toString()}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);

export const deleteAllUserSearchHistory = createAsyncThunk(
  "user/deleteAllUserSearchHistory",
  async ({ userId, accessToken }: DeleteAllUserSearchHistory) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/search-history/all?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);
