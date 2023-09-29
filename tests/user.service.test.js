import { userService } from '../services/user.service.js';
import { userRepository } from '../repositories/user.repository.js';
import { passwordService } from '../services/password.service.js';

describe('Test UserService', () => {
  it('login function', async () => {

    //ARRANGE
    userRepository.getByEmail = jest.fn().mockResolvedValue({id: 3, password: 'h4shedPa$$w0rd', email: 'asd@gmail.com', isAdmin: 0});
    passwordService.comparePasswords = jest.fn().mockReturnValue(true);

    //ACT
    const result = await userService.login("asd@gmail.com", "h4shedPa$$w0rd");

    //ASSERT
    expect(userRepository.getByEmail).toHaveBeenCalledTimes(1);
    expect(passwordService.comparePasswords).toBeCalledWith('h4shedPa$$w0rd', 'h4shedPa$$w0rd');
    expect(result.id).toBe(3);
    expect(result.email).toBe('asd@gmail.com');
    expect(result.isAdmin).toBe(0);
  });

  it('register function', async () => {
    userRepository.add = jest.fn().mockResolvedValue({id: 5, password: 'h4shedPa$$w0rd', email: 'asd@gmail.com', isAdmin: 0});
    passwordService.generateHash = jest.fn().mockReturnValue('h4shedPa$$w0rd');
    
    const userObject = {
        id: null,
        email: "asd@gmail.com",
        password: "alma12",
        isAdmin: 0
    }

    const result = await userService.register(userObject);

    expect(userRepository.getByEmail).toHaveBeenCalledTimes(1);
    expect(passwordService.generateHash).toBeCalledWith('alma12');
    expect(result.id).toBe(5);
    expect(result.password).toBe('h4shedPa$$w0rd');
    expect(result.email).toBe('asd@gmail.com');
    expect(result.isAdmin).toBe(0);
  });

  test('register function when the user is null', async () => {
    const expectedError = new Error('Invalid or missing user');

    try
    {
      await userService.register(null);
    }
    catch(error)
    {
      expect(expectedError).toEqual(error);
    }
  });

});