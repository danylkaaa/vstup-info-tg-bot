import { Inject, Injectable } from '@nestjs/common';
import { TelegramClientsModel } from './telegram-clients.model';
import { UserModel } from '../users/user.model';

@Injectable()
export class TelegramClientsRepository {
  constructor(
    @Inject(TelegramClientsModel)
    private readonly telegramUsersModel: typeof TelegramClientsModel,
  ) {}

  async getByTelegramId(telegramId: number): Promise<UserModel> {
    return this.telegramUsersModel
      .relatedQuery<UserModel>('user')
      .for(telegramId)
      .first();
  }
}
