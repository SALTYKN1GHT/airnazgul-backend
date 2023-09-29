import { destinationsRepository } from '../repositories/destinations.repository.js';

export const destService = {
  async getDestinations() {
    return await destinationsRepository.getList();
  },
  async getSettlementsByRealm() {},
  async getByFilter(from, to) {
    return await destinationsRepository.getByFilter(from, to);
  },
};
