import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'User Name is required'],
  trim: true,
  minlength: 2,
  maxLength: 50
 },
 email: {
  type: String,
  required: [true, "Email is required"],
  unique: true,
  trim: true,
  lowercase: true,
  match: [
   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
   "Please enter a valid email address"
  ]
 },
 password: {
  type: String,
  required: [true, "Password is required"],
  minlegth: 6
 }
}, { timestamps: true })


const User = mongoose.model('subscriptionUsers', userSchema);

export default User;