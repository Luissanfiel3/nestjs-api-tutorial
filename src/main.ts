import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
    })
  )

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `Our app is running on port ${PORT}`,
    );
  });
}

bootstrap();
