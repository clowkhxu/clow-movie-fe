const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ===================== GET USER MOVIES =====================

export const getUserMovies = async ({
  userId,
  type,
  page,
  limit,
  accessToken,
}: GetUserMovies): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      type,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${BACKEND_URL}/user/movies?${params.toString()}`,
      {
        method: "GET",
        headers: {
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

// ===================== CHECK MOVIE EXISTS =====================

export const checkMovieExists = async ({
  userId,
  movieSlug,
  type,
  accessToken,
}: CheckMovieExists): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/checkMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        movieSlug,
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

// ===================== ADD NEW MOVIE =====================

export const addNewMovie = async ({
  userId,
  movieData,
  type,
  playlistId,
  accessToken,
}: AddNewMovie): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        movieData,
        type,
        playlistId,
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

// ===================== DELETE MOVIE =====================

export const deleteMovie = async ({
  userId,
  movieSlug,
  type,
  accessToken,
  playlistId = null,
  movieId = null,
}: DeleteMovie): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      movieSlug,
      type,
    });

    if (playlistId) {
      params.append("playlistId", playlistId);
    }

    if (movieId) {
      params.append("movieId", movieId);
    }

    const response = await fetch(
      `${BACKEND_URL}/user/movie?${params.toString()}`,
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
