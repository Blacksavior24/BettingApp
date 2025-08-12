import { Module } from '@nestjs/common';
import { SportEventService } from './sport-event.service';
import { SportEventController } from './sport-event.controller';

@Module({
  controllers: [SportEventController],
  providers: [SportEventService],
})
export class SportEventModule {}
