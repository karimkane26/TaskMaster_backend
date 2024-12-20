/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de CORS avec plusieurs origines
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'https://task-master-frontend-9ovp0bzkd-karimkane26s-projects.vercel.app', 
      'https://task-master-frontend-six.vercel.app',
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true, // Accepte les cookies pour les requêtes CORS
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1'); // Préfixe global pour toutes les routes

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
