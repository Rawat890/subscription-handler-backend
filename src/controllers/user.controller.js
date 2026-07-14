import User from "../models/user.model.js";

/**
 - GET /api/v1/users
 - This endpoint is used to get all users
 */
export const getUsersController = async (req, res, next) => {
 try {
  const users = await User.find();

  res.status(200).json({
   success: true,
   data: users,
   message: "Users fetched successfully"
  })

 } catch (error) {
  next(error);
 }
}


/**
 - GET /api/v1/users/:id
 - This endpoint is used to get a single user
 */

export const getUserController = async (req, res, err) => {
 try {
  const userId = req.params.id;
  const user = await User.findById(userId).select('-password'); // -password means exclude password from response

  // when error comes the control will go to error middleware
  if (!user) {
   const error = new Error("User not found");
   error.statusCode = 404;
   throw error;
  }

  res.status(200).json({
   success: true,
   data: user,
   message: "User fetched successfully"
  })
 } catch (error) {
  next(error);
 }
}
