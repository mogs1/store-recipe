require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const argon2 = require('argon2');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Custom middleware to validate input data
app.use((req, res, next) => {
  const { body } = req;
  if (body && typeof body === 'object') {
    for (const key in body) {
      if (typeof body[key] !== 'string' && typeof body[key] !== 'number' && typeof body[key] !== 'boolean' && !Array.isArray(body[key])) {
        return res.status(400).send('Invalid input data');
      }
    }
  }
  next();
});

// Connect to MongoDB
if (!mongoURI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Models
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Routes
app.get('/', (req, res) => {
  res.send('Recipe Management API');
});

// User Registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const user = new User({ username, email, hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
  
    const passwordValid = await argon2.verify(user.hashedPassword, password);
    if (!passwordValid) return res.status(400).send('Invalid password');
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Recipe CRUD Operations
app.post('/recipes', async (req, res) => {
  const { title, ingredients, instructions, author } = req.body;
  if (!title || !ingredients || !instructions || !author) {
    return res.status(400).send('All fields are required');
  }
  try {
    const recipe = new Recipe({ title, ingredients, instructions, author });
    await recipe.save();
    res.status(201).send('Recipe created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.json(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, author } = req.body;
  if (!title || !ingredients || !instructions || !author) {
    return res.status(400).send('All fields are required');
  }
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, { title, ingredients, instructions, author }, { new: true });
    if (!updatedRecipe) return res.status(404).send('Recipe not found');
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) return res.status(404).send('Recipe not found');
    res.send('Recipe deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});