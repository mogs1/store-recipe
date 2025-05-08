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
  const [activeTab, setActiveTab] = React.useState<'ingredients' | 'instructions' | 'notes'>('ingredients');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-4">{recipe.title}</h2>

        <div className="mt-6">
          <div className="bg-gray-50 p-4 rounded-b max-h-60 overflow-y-auto">
            {activeTab === 'ingredients' &&
              <div className="grid grid-cols-2 gap-x-8 list-disc list-inside">
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </div>
            }

            {activeTab === 'instructions' &&
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
