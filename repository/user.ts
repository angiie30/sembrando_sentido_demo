import axios from "axios";
import { Login } from "../types";

export const auth = async (data: Login) => {
  const response = await axios.post(`/api/login`, data);
  return response.data;
};

export const logOut = async () => {
  const response = await axios.post(`/api/logout`);
  return response.data;
};
