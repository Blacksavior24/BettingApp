import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { SportEventModule } from './sport-event/sport-event.module';
import { BetModule } from './bet/bet.module';

@Module({
  imports: [UserModule, SportEventModule, BetModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
