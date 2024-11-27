/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: 'http://localhost:3000',  // Spécifiez l'URL de votre frontend
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE'],  // Liste des méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'],  // En-têtes autorisés (ajoutez d'autres si nécessaire)
    credentials: true,  // Pour accepter les cookies si vous utilisez des cookies pour l'authentification
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
