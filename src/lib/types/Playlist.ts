type GetUserPlaylists = {
  userId: string;
  accessToken: string;
}

type CreateNewPlaylist = {
  userId: string;
  playlistName: string;
  accessToken: string;
};

type UpdatePlaylist = {
  userId: string;
  playlistId: string;
  playlistName: string;
  accessToken: string;
};

type DeletePlaylist = {
  userId: string;
  playlistId: string;
  accessToken: string;
};

type GetPlaylistsContainingMovie = {
  userId: string;
  movieSlug: string;
  accessToken: string;
}

type GetUserMoviesFromPlaylist = {
  userId: string;
  playlistId: string;
  page: number;
  limit: number;
  accessToken: string;
}

type Playlist = {
  created_at: string;
  id: string;
  name: string;
  totalMovie: number;
  updated_at: string;
  user_id: string;
};