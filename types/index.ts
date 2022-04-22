export type Login = {
  username: string;
  password: string;
};

export type Profile = {
  id: number;
  name: string;
  username: string;
};

export type FormValidation = {
  isInvalid: boolean;
  message: string;
};
