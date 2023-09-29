import { destService } from '../services/destinations.service.js';

export const destinationsController = {
  async getDestinations(request, response, next) {
    try {
      const destinations = await destService.getDestinations();
      return response.status(200).json(destinations);
    } catch (error) {
      next(error);
    }
  },

  async getSettlementsByRealm(request, response, next) {
    try {
    } catch (error) {
      next(error);
    }
  },

  async getDestinationsByFilter(request, response, next) {
    try {
      const params = request.params;
      const destinations = await destService.getByFilter(params.from, params.to);

      return response.status(200).json(destinations);
    } catch (error) {
      next(error);
    }
  },
};
