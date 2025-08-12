import { IsString, IsNumber, IsOptional, IsDateString, IsIn } from 'class-validator';

export class CreateSportEventDto {
  @IsString()
  @IsIn(['sport', 'esport'], { message: 'La categoría debe ser sport o esport' })
  category: string;

  @IsOptional()
  @IsString()
  game?: string;

  @IsString()
  teamA: string;

  @IsString()
  teamB: string;

  @IsNumber()
  oddsA: number;

  @IsNumber()
  oddsB: number;

  @IsNumber()
  drawOdds: number;

  @IsDateString()
  date: string;
}
