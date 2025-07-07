type GetUserSearchHistory = {
  userId: string;
  accessToken: string;
};

type CreateUserSearchHistory = {
  userId: string;
  keyword: string;
  accessToken: string;
};

type DeleteUserSearchHistory = {
  id: string;
  userId: string;
  accessToken: string;
};

type DeleteAllUserSearchHistory = {
  userId: string;
  accessToken: string;
};
