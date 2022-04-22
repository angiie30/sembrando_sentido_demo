import { Car } from "@prisma/client";
import axios from "axios";

export const getList = async (categoryId: number) => {
  const response = await axios.get<Car[]>(`/api/cars/category/${categoryId}`);
  return response.data;
};

export const getCarDetail = async (carId: number) => {
  const response = await axios.get<Car>(`/api/cars/${carId}`);
  return response.data;
};

export const updateCar = async (car: Car) => {
  const response = await axios.put<Car>(`/api/cars/${car.id}`, car);
  return response.data;
};

export const deleteCar = async (carId: number) => {
  const response = await axios.delete<Car>(`/api/cars/${carId}`);
  return response.data;
};
