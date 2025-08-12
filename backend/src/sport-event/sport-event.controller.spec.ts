import { Test, TestingModule } from '@nestjs/testing';
import { SportEventController } from './sport-event.controller';
import { SportEventService } from './sport-event.service';

describe('SportEventController', () => {
  let controller: SportEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportEventController],
      providers: [SportEventService],
    }).compile();

    controller = module.get<SportEventController>(SportEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
