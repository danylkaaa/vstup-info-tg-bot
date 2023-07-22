import { Injectable } from '@nestjs/common';
import type { UserModel } from '../users/user.model';
import { TelegramClientsRepository } from './telegram-clients.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramClientsService {
  constructor(
    private readonly telegramClientsRepository: TelegramClientsRepository,
    private readonly usersService: UsersService,
  ) {}
  async createOrGetUser(telegramId: number): Promise<UserModel> {
    const existingUser = await this.telegramClientsRepository.getByTelegramId(
      telegramId,
    );

    if (existingUser) {
      return existingUser;
    }

    return await this.usersService.createNewUser(telegramId);
  }
}
