import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface RecipeFormProps {
  onSubmit: (recipe: { title: string, ingredients: string[], instructions: string, _id?: string, author?: string, createdAt?: string }) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ title, ingredients, instructions });
      toast.success('Recipe submitted successfully');
    } catch (error) {
      toast.error('Error submitting recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-300 ease-in-out"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ingredients" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = e.target.value;
                setIngredients(newIngredients);
              }}
              className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-300 ease-in-out"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="bg-red-500 text-white py-1 px-2 rounded transition-transform duration-300 hover:scale-105"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="bg-blue-500 text-white py-1 px-2 rounded mt-2 transition-transform duration-300 hover:scale-105"
        >
          Add Ingredient
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="instructions" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Instructions</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-300 ease-in-out"
          rows={4}
          required
        ></textarea>
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded transition-transform duration-300 hover:scale-105">
        Submit
      </button>
    </form>
  );
};

export default RecipeForm;