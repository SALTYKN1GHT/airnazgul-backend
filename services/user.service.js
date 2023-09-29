import { userRepository } from '../repositories/user.repository.js';
import { passwordService } from './password.service.js';

export const userService = {
  async register(user) {
    if (!user) {
      console.log("errort dobtunk");
      throw new Error('Invalid or missing user');
    }

    console.log("be service:", user);
    user.password = passwordService.generateHash(user.password);

    console.log("after generate hash:", user);
    const result = await userRepository.add(user);

    if (result.affectedRows === 1)
    {
      return {
        id: result.insertedId,
        email: user.email,
        userName: user.username,
        isAdmin: 0
      }
    }

    return null;
  },
  async login(email, password) {
    const result = await userRepository.getByEmail(email);

    if (result !== null && passwordService.comparePasswords(password, result.password)) {
      const newResult = {
        id: result.id,
        email: result.email,
        userName: result.userName,
        isAdmin: result.isAdmin,
      };

      return newResult;
    }
    return null;
  },
  async validateEmail(email) {
    const result = await userRepository.getByEmail(email);
    console.log(result);
    return result;
  },
  async getUserById(userId) {
    const userData = await userRepository.getById(userId);
    const viewModel = {
      id: userData.id,
      userName: userData.userName,
      email: userData.email,
      isAdmin: userData.isAdmin
    };

    return viewModel;
  },
  generateJwtToken(loggedInUser)
  {
    return jwtService.generateToken({ id: loggedInUser.id, email: loggedInUser.email}); 
  }
};
