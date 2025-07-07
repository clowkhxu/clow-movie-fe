const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ===================== GET REVIEWS BY MOVIE =====================

export const getFeedbacks = async ({
  movieSlug,
  limit,
  type,
}: GetFeedbacks): Promise<any> => {
  try {
    const params = new URLSearchParams({
      movieSlug,
      limit: limit.toString(),
      type,
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/list?${params.toString()}`
    );

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

// ===================== ADD NEW REVIEW =====================

export const addFeedback = async ({
  movieSlug,
  point,
  userId,
  content,
  type,
  accessToken,
}: AddFeedback): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/feedback/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        movieSlug,
        point,
        userId,
        content,
        type,
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

// ===================== DELETE FEEDBACK =====================

export const deleteFeedback = async ({
  feedbackId,
  userId,
  accessToken,
}: DeleteFeedback): Promise<any> => {
  try {
    const params = new URLSearchParams({
      feedbackId,
      userId,
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/delete?${params.toString()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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

// ===================== UPDATE CONTENT FEEDBACK =====================

export const updateContentFeedback = async ({
  feedbackId,
  userId,
  content,
  accessToken,
}: UpdateContentFeedback): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/feedback/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        feedbackId,
        userId,
        content,
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

// ===================== ADD NEW REPLY =====================

export const addReply = async ({
  movieSlug,
  userId,
  content,
  type,
  parentId,
  accessToken,
}: AddReplyFeedback): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/feedback/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        movieSlug,
        userId,
        content,
        type,
        parentId,
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

export const getStatsByMovie = async (movieSlug: string): Promise<any> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/feedback/statsByMovie?movieSlug=${movieSlug}`
    );

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

// ===================== ADD VOTE =====================

export const addVote = async ({
  movieSlug,
  userId,
  feedbackId,
  voteType,
  accessToken,
}: VoteFeedback): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/feedback/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        movieSlug,
        userId,
        feedbackId,
        voteType,
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
