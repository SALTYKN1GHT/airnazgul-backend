import express from 'express';
import { destinationsController } from '../controllers/destinations.controller.js';

const destinationsRouter = express.Router();

destinationsRouter.get('/', destinationsController.getDestinations);
destinationsRouter.get('/filter/:from/:to', destinationsController.getDestinationsByFilter);

export default destinationsRouter;
