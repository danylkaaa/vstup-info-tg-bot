import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Global, Module } from '@nestjs/common';
import { knexSnakeCaseMappers } from 'objection';
import { ConfigService } from '@nestjs/config';
import { ObjectionModuleOptions } from '@willsoto/nestjs-objection/src/interfaces';
import { ConfigKeys } from '../config/constants';
@Global()
@Module({
  imports: [
    ObjectionModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          // You can specify a custom BaseModel
          // If none is provided, the default Model will be used
          // https://vincit.github.io/objection.js/#models
          config: {
            ...knexSnakeCaseMappers(),
            client: 'postgres',
            pool: 3,
            connection: {
              host: config.getOrThrow(ConfigKeys.DB_HOST),
              port: config.getOrThrow(ConfigKeys.DB_PORT),
              database: config.getOrThrow(ConfigKeys.DB_NAME),
              user: config.getOrThrow(ConfigKeys.DB_USER),
              password: config.getOrThrow(ConfigKeys.DB_PSW),
            },
          },
        } as ObjectionModuleOptions;
      },
    }),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
