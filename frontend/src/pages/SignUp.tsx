import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from 'react-icons/fa';
import { BiCookie } from 'react-icons/bi';
import { GiCookingPot } from 'react-icons/gi';
import { toast} from 'react-toastify';
import { signUp } from '../auth'; // Import the signUp function

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  const navigate = useNavigate();


  const validateForm = () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await signUp(email, username, password);
      if (response) {
        toast.success('Registration successful!');
        navigate('/recipes');
      } else {
        toast.error('Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-start bg-gradient-to-br from-orange-400 to-amber-500 dark:from-amber-700 dark:to-orange-800">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <GiCookingPot className="text-4xl mr-2 text-white" />
            <h1 className="text-3xl font-bold text-white">Recipe Haven</h1>
          </div>
          
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Discover & Share <br />Amazing Recipes
          </h2>
          
          <p className="text-white text-lg mb-8 opacity-90">
            Join our community of food enthusiasts and explore thousands of delicious recipes from around the world.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-white">
              <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full w-8 h-8 mr-3">
                <FaCheck className="h-4 w-4 text-white" />
              </div>
              <span>Over 10,000+ recipes worldwide</span>
            </div>
            <div className="flex items-center text-white">
              <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full w-8 h-8 mr-3">
                <FaCheck className="h-4 w-4 text-white" />
              </div>
              <span>Save favorites to your cookbook</span>
            </div>
            <div className="flex items-center text-white">
              <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full w-8 h-8 mr-3">
                <FaCheck className="h-4 w-4 text-white" />
              </div>
              <span>Share your own culinary creations</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition hover:scale-105">
              <div className="h-24 bg-gradient-to-r from-amber-200 to-amber-100"></div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition hover:scale-105">
              <div className="h-24 bg-gradient-to-r from-orange-200 to-orange-100"></div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition hover:scale-105">
              <div className="h-24 bg-gradient-to-r from-red-200 to-red-100"></div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition hover:scale-105">
              <div className="h-24 bg-gradient-to-r from-yellow-200 to-yellow-100"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Account</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="johndoe"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="savePassword"
                  type="checkbox"
                  checked={savePassword}
                  onChange={(e) => setSavePassword(e.target.checked)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                />
                <label htmlFor="savePassword" className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <BiCookie className="mr-1" /> Remember me
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-amber-600 dark:to-orange-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Create Account
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-orange-600 dark:text-amber-500 hover:text-orange-500 dark:hover:text-amber-400 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;