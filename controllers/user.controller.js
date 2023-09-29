import { userService } from '../services/user.service.js';

export const userController = {
  async registerUser(request, response, next) {
    //Backend validáció implementálása
    const user = request.body;
    console.log('backend:', user);
    try {
      const registeredUser = await userService.register(user);
      return response.status(200).json(registeredUser);
    } catch (err) {
      next(err);
    }
  },

  async loginUser(request, response, next) {
    const { email, password } = request.body;
    try {
      const loggedInUser = await userService.login(email, password);
      if (loggedInUser) {
        const token = userService.generateJwtToken(loggedInUser);
        return response.status(200).json({ user: loggedInUser, token });
      } else {
        return response.status(200).json({ user: null, token: null, message: 'User authorization failed.' });
      }
    } catch (err) {
      next(err);
    }
  },

  async validateEmail(request, response, next) {
    const email = request.body;
    try {
      const validatedUser = await userService.validateEmail(email);
      if (!!validatedUser) {
        return response.status(406).json({ availabilityStatus: false, message: 'This email adress is already in use' });
      } else {
        return response.status(200).json({ availabilityStatus: true, message: 'Email ok' });
      }
    } catch (err) {
      next(err);
    }
  },

  async getUserProfile(request, response, next) {
    try
    {
      const user = await userService.getUserById(request.userId);
      return response.status(200).json(user);
    }
    catch(error)
    {
      next(error);
    }
  },

  async updateUserProfile(request, response, next) {
    const userId = request.user.id;
    const updatedData = request.body;
    try {
      const updatedUser = await userService.updateUserProfile(userId, updatedData);
      return response.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
};
