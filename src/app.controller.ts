import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.config.get('DB_USER');
  }
}
