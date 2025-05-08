import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ensure this matches the backend URL

export const signUp = async (email: string, username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, username, password });
    return response.data;
  } catch (error) {
    throw new Error('Sign up failed');
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};

export const fetchRecipeById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe');
  }
};