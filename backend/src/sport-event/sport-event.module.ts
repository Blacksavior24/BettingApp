import { Module } from '@nestjs/common';
import { SportEventService } from './sport-event.service';
import { SportEventController } from './sport-event.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SportEventController],
  providers: [SportEventService, PrismaService],
})
export class SportEventModule {}
