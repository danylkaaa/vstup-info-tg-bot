import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createNewUser(telegramId: number): Promise<UserModel> {
    return this.usersRepository.createWithTelegramClient(telegramId);
  }
}
