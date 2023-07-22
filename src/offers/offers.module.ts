import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferModel } from './offer.model';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { OfferRepository } from './offer.repository';
import { HttpModule } from '@nestjs/axios';
import { OfferSiteParser } from './OfferSiteParser';

@Module({
  providers: [OfferService, OfferRepository, OfferSiteParser],
  imports: [ObjectionModule.forFeature([OfferModel]), HttpModule],
  exports: [OfferService],
})
export class OffersModule {}
