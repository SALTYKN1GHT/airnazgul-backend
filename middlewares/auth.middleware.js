import { jwtService } from '../services/jwt.service.js';

export function validateToken(req, res, next) {
  const tokenRaw = req.headers.authorization;

  if (!tokenRaw) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  
  const token = jwtService.getToken(tokenRaw);
  if (!jwtService.verifyToken(token)) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  const decodedToken = jwtService.getTokenPayload(token);
  req.userId = decodedToken.id;

  next();
}
