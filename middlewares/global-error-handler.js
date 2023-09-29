import LoggingService from '../services/logging.service.js';

const loggingService = new LoggingService();

export function globalErrorHandler(err, req, res, next) {
  loggingService.logError(err.message);
  loggingService.logError(err.stack);
  
  res.status(500).json({ error: err.stack, message: err.message });
}
