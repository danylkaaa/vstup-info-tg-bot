import { Injectable } from '@nestjs/common';
import { UserModel } from '../users/user.model';
import { OfferModel } from '../offers/offer.model';
import { ApplicationsRepository } from './applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly applicationsRepository: ApplicationsRepository,
  ) {}
  async create(user: UserModel, offer: OfferModel) {
    return this.applicationsRepository.create(user.id, offer.id);
  }

  async getByUserAndOffer(user: UserModel, offer: OfferModel) {
    return this.applicationsRepository.findByUserAndOffer(user.id, offer.id);
  }
}
