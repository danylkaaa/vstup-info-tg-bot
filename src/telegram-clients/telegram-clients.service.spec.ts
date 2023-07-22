import { Test, TestingModule } from '@nestjs/testing';
import { TelegramClientsService } from './telegram-clients.service';

describe('TelegramClientsService', () => {
  let service: TelegramClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramClientsService],
    }).compile();

    service = module.get<TelegramClientsService>(TelegramClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
