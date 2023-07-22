import { Model } from 'objection';

export class OfferModel extends Model {
  static get tableName() {
    return 'offers';
  }

  static get idColumn() {
    return 'id';
  }

  id: number;
  name: string;
  freeSize: number;

  static get relationMappings() {
    return {};
  }
}
