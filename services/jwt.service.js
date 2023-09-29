import jwt from 'jsonwebtoken';
import config from '../config.js';
import LoggingService from './logging.service.js';

const loggingService = new LoggingService();

export const jwtService = {
  generateToken(payload) {
    return jwt.sign(payload, config.SECRET_KEY, { expiresIn: '1h' });
  },

  verifyToken(token) {
    try {
      loggingService.logInfo(`verifyToken called with ${token}`);

      return jwt.verify(token, config.SECRET_KEY);
    } 
    catch (error) 
    {
      const errorMessage = 'JWT verification failed: ' + error.message;
      loggingService.logError(errorMessage);

      throw new Error(errorMessage);
    }
  },

  getToken(token) {
    return token.replace("Bearer ", "");
  },

  getTokenPayload(token)
  {
    return jwt.decode(token);
  }
};
