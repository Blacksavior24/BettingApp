import { Injectable } from '@nestjs/common';
import { CreateSportEventDto } from './dto/create-sport-event.dto';
import { UpdateSportEventDto } from './dto/update-sport-event.dto';

@Injectable()
export class SportEventService {
  create(createSportEventDto: CreateSportEventDto) {
    return 'This action adds a new sportEvent';
  }

  findAll() {
    return `This action returns all sportEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sportEvent`;
  }

  update(id: number, updateSportEventDto: UpdateSportEventDto) {
    return `This action updates a #${id} sportEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} sportEvent`;
  }
}
