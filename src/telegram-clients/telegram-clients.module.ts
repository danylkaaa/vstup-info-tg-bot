import { Module } from '@nestjs/common';
import { TelegramClientsService } from './telegram-clients.service';
import { TelegramClientsRepository } from './telegram-clients.repository';
import { TelegramClientsModel } from './telegram-clients.model';
import { UsersModule } from '../users/users.module';
import { ObjectionModule } from '@willsoto/nestjs-objection';

@Module({
  imports: [UsersModule, ObjectionModule.forFeature([TelegramClientsModel])],
  providers: [TelegramClientsRepository, TelegramClientsService],
  exports: [TelegramClientsService],
})
export class TelegramClientsModule {}
