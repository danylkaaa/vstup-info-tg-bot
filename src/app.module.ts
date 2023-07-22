import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramModule } from './telegram/telegram.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigKeys } from './config/constants';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TelegramClientsModule } from './telegram-clients/telegram-clients.module';
import { OffersModule } from './offers/offers.module';
import { ApplicationsModule } from './applications/applications.module';
import { OfferApplicantsModule } from './offer_applicants/offer_applicants.module';
import { session } from 'telegraf';
import { RedisSessionService } from './redisSession/redisSession.service';
import { RedisSessionModule } from './redisSession/redisSession.module';

@Module({
  imports: [
    RedisSessionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      useFactory: (
        configService: ConfigService,
        redisSession: RedisSessionService,
      ) => ({
        botName: configService.getOrThrow(ConfigKeys.TG_BOT_NAME),
        token: configService.getOrThrow(ConfigKeys.TG_API_TOKEN),
        middlewares: [
          session({
            store: redisSession,
          }),
        ],
      }),
      inject: [ConfigService, RedisSessionService],
      imports: [RedisSessionModule],
    }),
    DatabaseModule,
    TelegramClientsModule,
    UsersModule,
    TelegramModule,
    OffersModule,
    ApplicationsModule,
    OfferApplicantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
