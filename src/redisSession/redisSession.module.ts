import { Module } from '@nestjs/common';
import { RedisSessionService } from './redisSession.service';

@Module({
  providers: [RedisSessionService],
  exports: [RedisSessionService],
})
export class RedisSessionModule {}
