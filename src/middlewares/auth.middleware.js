import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authorize = async (req, res, next) => {
 try {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
   token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
   res.status(401).json({
    success: false,
    message: 'Not authorized to access this route'
   })
   throw new Error('Not authorized to access this route');
  }

  const decoded = await jwt.verify(token, JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
   res.status(401).json({
    success: false,
    message: 'Not authorized to access this route'
   })
   throw new Error('Not authorized to access this route');
  }

  req.user = user;
  next();
 } catch (error) {
  next(error);
 }
}

