import axios from 'axios';
import { toast } from 'react-toastify';
import type { Recipe } from '../pages/AllRecipes';

const fetchRecipes = async (setLoading: (loading: boolean) => void): Promise<Recipe[]> => {
  try {
    setLoading(true);
    const response = await axios.get<Recipe[]>('http://localhost:5000/recipes');
    setLoading(false);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    toast.error('Error fetching recipes');
    setLoading(false);
    return [];
  }
};

const submitRecipe = async (recipe: { title: string, ingredients: string[], instructions: string, _id?: string, author?: string, createdAt?: string }, setLoading: (loading: boolean) => void): Promise<void> => {
  try {
    setLoading(true);
    await axios.post('http://localhost:5000/recipes', recipe);
    toast.success('Recipe submitted successfully');
    setLoading(false);
  } catch (error) {
    toast.error('Error submitting recipe');
    setLoading(false);
  }
};

const fetchRecipeById = async (id: string, setLoading: (loading: boolean) => void): Promise<Recipe | null> => {
  try {
    setLoading(true);
    const response = await axios.get<Recipe>(`http://localhost:5000/recipes/${id}`);
    setLoading(false);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    toast.error('Error fetching recipe');
    setLoading(false);
    return null;
  }
};

export { fetchRecipes, submitRecipe, fetchRecipeById };