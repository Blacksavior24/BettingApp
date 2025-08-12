import { Injectable } from '@nestjs/common';
import { CreateSportEventDto } from './dto/create-sport-event.dto';
import { UpdateSportEventDto } from './dto/update-sport-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SportEventService {

  constructor(private prisma: PrismaService) {}

  create(createSportEventDto: CreateSportEventDto) {
    return this.prisma.sportEvent.create({
      data: createSportEventDto,
    });
  }

  findAll() {
    return this.prisma.sportEvent.findMany();
  }

  findOne(id: number) {
    return this.prisma.sportEvent.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSportEventDto: UpdateSportEventDto) {
    return this.prisma.sportEvent.update({
      where: { id },
      data: updateSportEventDto,
    });
  }

  remove(id: number) {
    return this.prisma.sportEvent.delete({
      where: { id },
    });
  }
}
