import React from 'react';
import type { Recipe } from '../pages/AllRecipes';

interface RecipeDetailProps {
  recipe: { title: string, ingredients: string[], instructions: string };
  fetchRecipeById: (id: string) => Promise<Recipe | null>;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-300">{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-2">Instructions</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="prose max-w-none text-gray-600 dark:text-gray-300"></div>
    </div>
  );
};

export default RecipeDetail;