import { Inject, Injectable } from '@nestjs/common';
import { ApplicationModel } from './application.model';

@Injectable()
export class ApplicationsRepository {
  constructor(
    @Inject(ApplicationModel)
    private readonly applicationModel: typeof ApplicationModel,
  ) {}

  async create(userId: string, offerId: number): Promise<ApplicationModel> {
    return this.applicationModel.query().insertAndFetch({
      userId,
      offerId,
    });
  }
  async findByUserAndOffer(userId: string, offerId: number) {
    return this.applicationModel
      .query()
      .where({
        userId,
        offerId,
      })
      .first();
  }
}
