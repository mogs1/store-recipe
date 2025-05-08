import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../utils/apiUtils';
import AddNewRecipe from '../components/AddNewRecipe';
import RecipeDetailModal from '../components/RecipeDetail';

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  author: string;
  createdAt: string;
}

const AllRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const uniqueAuthors = Array.from(new Set(recipes.map(recipe => recipe.author)));

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterOption === '' || recipe.author === filterOption)
  );

  useEffect(() => {
    const fetchAndSetRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };
    fetchAndSetRecipes();
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailModal(true);
  };
 
  return (
    <div className=" bg- flex flex-col justify-center items-center max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">All Recipes</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Filter & Search Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by title"
              className="flex-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
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

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-100 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-indigo-600">{recipe.title}</h2>
                <p className="text-sm text-gray-500">By {recipe.author}</p>
                <button
                  onClick={() => handleRecipeClick(recipe)}
                  className="mt-3 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
                >
                  View Recipe
                </button>
              </div>
            ))}
          </div>

          {/* Add Recipe Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded"
            >
              Add New Recipe
            </button>
          </div>
        </>
      )}

      {/* Recipe Detail Modal */}
      {showDetailModal && selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {/* Add Recipe Modal */}
      {showAddModal && (
        <AddNewRecipe onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default AllRecipes;
