import { Model } from 'objection';
import { OfferModel } from '../offers/offer.model';
import { UserModel } from '../users/user.model';

export class ApplicationModel extends Model {
  static get tableName() {
    return 'application';
  }

  static get idColumn() {
    return 'id';
  }

  id: number;
  offerId: number;
  userId: string;

  offer?: OfferModel;
  user?: UserModel;

  static get relationMappings() {
    return {
      offer: {
        relation: Model.BelongsToOneRelation,
        modelClass: OfferModel,
        join: {
          from: 'applications.offer_ids',
          to: OfferModel.tableName + '.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'applications.user_id',
          to: UserModel.tableName + '.id',
        },
      },
    };
  }
}
