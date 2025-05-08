import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  author: string;
  createdAt: string;
}

const AllRecipes: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const uniqueAuthors = Array.from(new Set(recipes.map((recipe) => recipe.author)));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterOption === '' || recipe.author === filterOption)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (recipes.length > 0) {
      setLoading(false);
    }
  }, [recipes]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by title"
              className="w-full p-2 border rounded"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="w-full p-2 mt-2 border rounded"
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="">Filter by Author</option>
              {uniqueAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card">
                <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-gray-700 mb-2">Author: {recipe.author}</p>
                <button
                  onClick={() => handleRecipeClick(recipe)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  View Recipe
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/recipe-form')}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
          >
            Add New Recipe
          </button>
        </>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowModal(false)}
              className="close-button"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Recipe Details</h2>
            <p className="text-gray-700 mb-2">Title: {selectedRecipe?.title}</p>
            <p className="text-gray-700 mb-2">Ingredients:</p>
            <ul>
              {selectedRecipe?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p className="text-gray-700 mb-2">Instructions:</p>
            <p>{selectedRecipe?.instructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRecipes;
export type { Recipe };