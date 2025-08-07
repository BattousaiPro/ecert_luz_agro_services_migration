import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const configSwagger = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('/api/v1/swagger')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("/api/v1");

  //const config: ConfigService = app.get(ConfigService);
  //const port: number = config.get<number>("PORT");

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  SwaggerModule.setup('/api/v1/swagger', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log("[WEB]", 
      'config.get<string>("BASE_URL")'
  );
  });
}

bootstrap();
