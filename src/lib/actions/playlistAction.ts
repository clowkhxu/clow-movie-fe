const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ===================== GET PLAYLISTS =====================
export const getPlaylists = async ({
  userId,
  accessToken,
}: GetUserPlaylists): Promise<any> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/user/playlists?userId=${userId}`,
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

// ===================== CREATE NEW PLAYLIST =====================

export const createNewPlaylist = async ({
  userId,
  playlistName,
  accessToken,
}: CreateNewPlaylist): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        playlistName,
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

// ===================== Update PLAYLIST =====================

export const updatePlaylist = async ({
  userId,
  playlistId,
  playlistName,
  accessToken,
}: UpdatePlaylist): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/playlist`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        playlistId,
        playlistName,
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

// ===================== DELETE PLAYLIST =====================

export const deletePlaylist = async ({
  userId,
  playlistId,
  accessToken,
}: DeletePlaylist): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/playlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
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

// ===================== GET PLAYLISTS CONTAINING MOVIE =====================

export const getPlaylistsContainingMovie = async ({
  userId,
  movieSlug,
  accessToken,
}: GetPlaylistsContainingMovie): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      movieSlug,
    });

    const response = await fetch(
      `${BACKEND_URL}/user/playlists/listByMovie?${params.toString()}`,
      {
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
