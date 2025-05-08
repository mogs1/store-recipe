const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], default: ['User'] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;