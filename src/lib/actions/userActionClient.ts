"use client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateUserProfile = async ({
  userId,
  username,
  gender,
  avatar,
  typeAccount,
  accessToken,
}: UpdateUserProflie): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        username,
        gender,
        avatar,
        typeAccount,
      }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ===================== RESET PASSWORD =====================

export const resetPassword = async ({
  email,
  newPassword,
  oldPassword,
  typeAccount,
  accessToken,
}: UpdateUserPassword): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email,
        newPassword,
        oldPassword,
        typeAccount,
      }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
