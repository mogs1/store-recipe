import { useState } from 'react';
import { submitRecipe } from '../utils/apiUtils';
import { toast } from 'react-toastify';

interface AddNewRecipeProps {
  onClose: () => void;
}

const AddNewRecipe: React.FC<AddNewRecipeProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('30');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe = {
    title,
    category,
    preparationTime: parseInt(prepTime),
    ingredients: ingredients.split('\n').filter(Boolean),
    instructions,
    author: 'Anonymous',
    createdAt: new Date(), // optional, if not handled automatically by schema
};


    try {
      setLoading(true);
      await submitRecipe(newRecipe);
      toast.success('Recipe added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-lg shadow-lg">
        <div className="bg-purple-600 text-white text-xl font-bold px-6 py-4 rounded-t-xl flex justify-between items-center">
          <span>Add New Recipe</span>
          <button onClick={onClose} className="text-white text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-semibold mb-1">Recipe Title</label>
            <input
              type="text"
              placeholder="Enter recipe title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded bg-slate-100 text-gray-800"
                required
              >
                <option value="">Select category...</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Preparation Time</label>
              <div className="flex">
                <input
                  type="number"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="w-3/4 p-2 border rounded-l bg-slate-100 text-gray-800"
                />
                <span className="w-1/4 flex items-center justify-center text-gray-800 bg-gray-300 border border-l-0 rounded-r">
                  minutes
                </span>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Ingredients</label>
            <textarea
              placeholder="Add ingredients, one per line..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-2 border rounded h-24 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Instructions</label>
            <textarea
              placeholder="Write cooking instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-2 border rounded h-24 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewRecipe;
