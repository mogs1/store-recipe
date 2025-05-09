import React from 'react';

interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-300 text-gray-800 rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-4">{recipe.title}</h2>

        <div className="mt-6">
          <div className="bg-gray-800 text-gray-100 p-4 rounded-b max-h-60 overflow-y-auto">
            <h2 className='text-xl font-bold text-indigo-600'>INGREDIENTS</h2>
              <div className="grid grid-cols-2 gap-x-8 list-disc list-inside">
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </div>
          </div>

            <div className='bg-gray-800 text-gray-100 mt-5 p-10'>
              <h2 className='text-xl font-bold text-indigo-600'>INSTRCTIONS</h2>
              {recipe.instructions}
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
