import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { submitRecipe } from '../utils/apiUtils';

interface AddNewRecipeProps {
  onAdd: (recipe: Recipe) => void;
}

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string;
}

const [loading, setLoading] = useState(false);

const AddNewRecipe: React.FC<AddNewRecipeProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe = {
      title,
      ingredients,
      instructions,
    };

    try {
      setLoading(true);
      await submitRecipe(newRecipe, setLoading);
      onAdd(newRecipe);
      toast.success('Recipe added successfully!');
      navigate('/recipes');
      setLoading(false);
    } catch (error) {
      toast.error('Failed to add recipe.');
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 mb-2">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="w-full p-2 border rounded mr-2"
                required
              />
              <button
                onClick={() => handleRemoveIngredient(index)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
          >
            Add Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-gray-700 mb-2">Instructions</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewRecipe;