import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000';

const signUpUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    toast.error('Sign up failed');
    throw new Error('Sign up failed');
  }
};

const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

const submitRecipe = async (recipeData: { title: string; ingredients: string[]; instructions: string }) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, recipeData);
    return response.data;
  } catch (error) {
    toast.error('Failed to submit recipe');
    throw new Error('Failed to submit recipe');
  }
};

const fetchRecipeById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch recipe by ID');
    throw new Error('Failed to fetch recipe by ID');
  }
};

const deleteRecipe = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to delete recipe');
    throw new Error('Failed to delete recipe');
  }
};

export { signUpUser, fetchRecipes, submitRecipe, fetchRecipeById, deleteRecipe };