import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRecipes, submitRecipe, fetchRecipeById } from './utils/apiUtils';
import type { Recipe } from './pages/AllRecipes';
import AllRecipes from './pages/AllRecipes';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';

// Function to check if the user is authenticated
const useAuth = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Protected Route component
const ProtectedRoute = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => {
  const isAuth = useAuth();
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(setLoading).then(setRecipes);
  }, []);

  const handleSubmit = async (recipe: { title: string, ingredients: string[], instructions: string, _id?: string, author?: string, createdAt?: string }) => {
    await submitRecipe(recipe, setLoading);
    navigate('/');
    fetchRecipes(setLoading).then(setRecipes);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Recipe App</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/recipes">All Recipes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/recipe-form">Add New Recipe</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Sign In</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn btn-primary" onClick={() => localStorage.removeItem('token')}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/recipes" element={<ProtectedRoute><AllRecipes recipes={recipes} /></ProtectedRoute>} />
          <Route path="/recipe-form" element={<ProtectedRoute><RecipeForm onSubmit={handleSubmit} /></ProtectedRoute>} />
          <Route
            path="/recipe/:id"
            element={<ProtectedRoute>
              <RecipeDetail
                recipe={selectedRecipe || { title: '', ingredients: [], instructions: '' }}
                fetchRecipeById={(id: string) => fetchRecipeById(id, setLoading)}
              />
            </ProtectedRoute>}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;

// Removed unused logo variable
