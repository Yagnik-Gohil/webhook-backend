import { Test, TestingModule } from '@nestjs/testing';
import { EventHistoryController } from './event-history.controller';
import { EventHistoryService } from './event-history.service';

describe('EventHistoryController', () => {
  let controller: EventHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventHistoryController],
      providers: [EventHistoryService],
    }).compile();

    controller = module.get<EventHistoryController>(EventHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
