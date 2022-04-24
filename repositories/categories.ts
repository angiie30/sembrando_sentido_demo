import { Category } from "@prisma/client";
import axios from "axios";

export const getCategories = async () => {
  const response = await axios.get<Category[]>(`/api/categories`);
  return response.data;
};
