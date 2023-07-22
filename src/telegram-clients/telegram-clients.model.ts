import { Model } from 'objection';
import { UserModel } from '../users/user.model';
import { UsersModule } from '../users/users.module';

export class TelegramClientsModel extends Model {
  static get tableName() {
    return 'telegram_clients';
  }
  static get idColumn() {
    return 'telegramId';
  }
  telegramId: number;
  userId: string;
  user?: UsersModule;

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: TelegramClientsModel.tableName + '.user_id',
          to: 'users.id',
        },
      },
    };
  }
}
