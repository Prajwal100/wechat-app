import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({origin:["http://localhost:3000"],credentials:true})

  try {
    await app.listen(PORT, () => console.log(`Server running at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
