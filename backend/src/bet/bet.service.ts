import { Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BetService {

  constructor(private prisma: PrismaService) {}

  create(createBetDto: CreateBetDto) {
    return this.prisma.bet.create({
      data: createBetDto,
      include: {
        user: true,
        event: true,
      },
    });
  }

  findAll() {
    return this.prisma.bet.findMany({
      select: {
        id: true,
        userId: true,
        eventId: true,
        selectedOutcome: true,
        amount: true,
        potentialWinnings: true,
        status: true,
        date: true,
        event: true
      },
    });
  }

  findOne(id: number) {
    return this.prisma.bet.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBetDto: UpdateBetDto) {
    return this.prisma.bet.update({
      where: { id },
      data: updateBetDto,
    });
  }

  remove(id: number) {
    return this.prisma.bet.delete({
      where: { id },
    });
  }
}
