import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { UsersModule } from '../users/users.module';
import { TelegramClientsModule } from '../telegram-clients/telegram-clients.module';
import { ClsModule } from 'nestjs-cls';
import { RegisterNewOfferScene } from './scenes/RegisterNewOffer.scene';
import { OffersModule } from '../offers/offers.module';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  providers: [TelegramService, TelegramUpdate, RegisterNewOfferScene],
  imports: [
    UsersModule,
    ApplicationsModule,
    OffersModule,
    TelegramClientsModule,
    ClsModule.forRoot({
      middleware: {
        // automatically mount the
        // ClsMiddleware for all routes
        mount: true,
      },
    }),
  ],
})
export class TelegramModule {}
