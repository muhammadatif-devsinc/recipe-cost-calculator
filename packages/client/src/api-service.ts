import axios, { type AxiosError } from 'axios';
import { type RecipeType } from '@rcc/shared';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_RCC_API_BASE_URL as string}/api/v1`
});

type Response<T> = Promise<[Error | null, T | null]>;

export const createRecipe = async (
  payload: RecipeType
): Response<RecipeType> => {
  try {
    const response = await axiosInstance.post<RecipeType>('/recipe', payload);
    return [null, response.data];
  } catch (error) {
    return [error as AxiosError, null];
  }
};

export const getRecipe = async (
  recipeName: string
): Response<RecipeType> => {
  try {
    const response = await axiosInstance.get(`/recipe/${recipeName}`);
    return [null, response.data as RecipeType];
  } catch (error) {
    return [error as AxiosError, null];
  }
};
