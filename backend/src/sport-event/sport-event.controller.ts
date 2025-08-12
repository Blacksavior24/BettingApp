import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportEventService } from './sport-event.service';
import { CreateSportEventDto } from './dto/create-sport-event.dto';
import { UpdateSportEventDto } from './dto/update-sport-event.dto';

@Controller('sport-event')
export class SportEventController {
  constructor(private readonly sportEventService: SportEventService) {}

  @Post()
  create(@Body() createSportEventDto: CreateSportEventDto) {
    return this.sportEventService.create(createSportEventDto);
  }

  @Get()
  findAll() {
    return this.sportEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportEventDto: UpdateSportEventDto) {
    return this.sportEventService.update(+id, updateSportEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportEventService.remove(+id);
  }
}
