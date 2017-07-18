const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  providerId: String,
  username: String,
  name: String,
  lastName: String,
  password: String,
  email: String,
  city: String
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
