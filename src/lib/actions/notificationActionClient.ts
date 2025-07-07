const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getNotifications = async ({
  limit,
  type,
  userId,
  afterTime,
}: GetNotifications): Promise<any> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      type,
    });

    if (userId) params.append("userId", userId);
    if (afterTime) params.append("afterTime", afterTime.toString());

    const response = await fetch(
      `${BACKEND_URL}/notification/list?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

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
};

export const createNotification = async ({
  userId,
  senderId,
  type,
  content,
  href,
  image,
  accessToken,
}: CreateNotification): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/notification/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        senderId,
        type,
        content,
        href,
        image,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create notification");
    }

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
};
