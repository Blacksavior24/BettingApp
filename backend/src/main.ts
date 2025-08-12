import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors()

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true,           // Transforma los objetos a sus clases DTO
      disableErrorMessages: false, // Habilita mensajes de error (útil para desarrollo)
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
