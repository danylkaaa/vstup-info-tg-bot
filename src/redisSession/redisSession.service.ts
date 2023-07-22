import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ioredis from 'ioredis';
import { ConfigKeys } from '../config/constants';

@Injectable()
export class RedisSessionService {
  readonly redis: ioredis.Redis;

  constructor(private readonly config: ConfigService) {
    this.redis = new ioredis.Redis({
      host: config.getOrThrow(ConfigKeys.REDIS_HOST),
      port: config.getOrThrow(ConfigKeys.REDIS_PORT),
    });
  }

  async get(name: string) {
    const value = await this.redis.get(name);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }

  set(name: string, value: any) {
    return this.redis.set(name, JSON.stringify(value));
  }

  delete(name: string) {
    return this.redis.del(name);
  }
}
