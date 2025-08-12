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
    });
  }

  findAll() {
    return this.prisma.bet.findMany();
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
