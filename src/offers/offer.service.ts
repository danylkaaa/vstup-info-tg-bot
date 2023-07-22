import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OfferRepository } from './offer.repository';
import { OfferSiteParser } from './OfferSiteParser';

@Injectable()
export class OfferService {
  private readonly logger = new Logger(OfferService.name);

  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly offerSiteParser: OfferSiteParser,
  ) {}

  async lookup(offerId: number) {
    const savedOffer = await this.offerRepository.getById(offerId);

    if (savedOffer) {
      return savedOffer;
    }
    this.logger.log(`no such offer ${offerId}`);
    const page = await this.offerSiteParser.parsePage(offerId);

    if (!page) {
      throw new UnprocessableEntityException('Cannot process such offer');
    }

    return await this.offerRepository.create(offerId, page);
  }
}
