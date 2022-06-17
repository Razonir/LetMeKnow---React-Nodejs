import mongoose from 'mongoose';

var UserModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  // For regular users
  password: {
    type: String
  },
  // For Google users only
  googleToken: {
    type: String
  },
  role: {
    type: String,
    enum : ['user','admin'],
    default: 'user',
    required: true
  },
  // This is the authorization token of the user
  token: {
    type: String,
    required: false
  }
});

var UserModel = mongoose.model('users', UserModelSchema );

export default UserModel;