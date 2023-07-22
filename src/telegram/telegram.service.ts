import { Injectable } from '@nestjs/common';
import { UserModel } from '../users/user.model';
import { TelegramClientsService } from '../telegram-clients/telegram-clients.service';

@Injectable()
export class TelegramService {
  constructor(
    private readonly telegramClientsService: TelegramClientsService,
  ) {}

  async createOrGetUser(telegramUserId: number): Promise<UserModel> {
    return this.telegramClientsService.createOrGetUser(telegramUserId);
  }
}
