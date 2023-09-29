import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/validateemail', userController.validateEmail);

userRouter.get('/profile', validateToken, userController.getUserProfile);
userRouter.put('/update', validateToken, userController.updateUserProfile);

export default userRouter;
