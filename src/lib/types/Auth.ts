type RegisterGoogleAccount = {
  email: string;
  name: string;
  password: null;
  typeAccount: "google";
  avatar: string;
};

type Login = {
  email: string;
  password: string;
  typeAccount: "credentials" | "google";
};

type ResetPassword = {
  email: string;
  password: string;
};
