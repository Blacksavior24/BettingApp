import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log("hashedPassword", hashedPassword);

    return this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select:{
        id: true,
        username: true,
        bets: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select:{
        id: true,
        username: true,
        bets: true, // Assuming you want to include bets as well
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, password: hashedPassword },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
