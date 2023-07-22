import { Inject, Injectable } from '@nestjs/common';
import { OfferModel } from './offer.model';
import { ParsedOfferDTO } from './dto/ParsedOfferDTO';

@Injectable()
export class OfferRepository {
  constructor(
    @Inject(OfferModel)
    private readonly offerModel: typeof OfferModel,
  ) {}

  async getById(id: number): Promise<OfferModel | null> {
    return this.offerModel.query().findById(id);
  }

  async create(offerId: number, offerDto: ParsedOfferDTO): Promise<OfferModel> {
    return this.offerModel.query().insert({
      id: offerId,
      freeSize: +offerDto.freeSize,
      name: offerDto.title,
    });
  }
}
