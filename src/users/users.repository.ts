import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async createWithTelegramClient(telegramId: number): Promise<UserModel> {
    const user = await this.userModel.query().insertGraph({
      id: uuid(),
      telegramClient: {
        telegramId,
      },
    });
    return this.userModel
      .query()
      .findById(user.id)
      .withGraphJoined('telegramClient');
  }
}
