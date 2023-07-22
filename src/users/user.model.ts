import { Model } from 'objection';
import { TelegramClientsModel } from '../telegram-clients/telegram-clients.model';

export class UserModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  id: string;
  telegramClient?: TelegramClientsModel;

  static get relationMappings() {
    return {
      telegramClient: {
        relation: Model.HasOneRelation,
        modelClass: TelegramClientsModel,
        join: {
          from: 'users.id',
          to: TelegramClientsModel.tableName + '.user_id',
        },
      },
    };
  }
}
