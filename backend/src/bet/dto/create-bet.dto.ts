import { IsNumber, IsString, IsDateString, IsIn } from 'class-validator';

export class CreateBetDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  eventId: number;

  @IsString()
  selectedOutcome: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  potentialWinnings: number;

  @IsString()
  @IsIn(['Pendiente', 'Ganada', 'Perdida'], { message: 'Estado inválido' })
  status: string;

  @IsDateString()
  date: string;
}
