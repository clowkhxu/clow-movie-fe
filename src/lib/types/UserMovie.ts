type GetUserMovies = {
  userId: string;
  type: "history" | "favorite" | "playlist";
  page: number;
  limit: number;
  accessToken: string;
};

type CheckMovieExists = {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
};

type AddNewMovie = {
  userId: string;
  movieData: {
    movieName: string;
    movieSlug: string;
    moviePoster: string;
    movieThumbnail: string;
  };
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string;
};

type DeleteMovie = {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
  accessToken: string;
  playlistId?: string | null;
  movieId?: string | null;
};
