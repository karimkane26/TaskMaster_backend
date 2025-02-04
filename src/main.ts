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
      'https://task-master-frontend-olive.vercel.app',
      'https://task-master-frontend-git-main-karimkane26s-projects.vercel.app',
      'https://task-master-frontend-9g1mjrsf8-karimkane26s-projects.vercel.app',
      'http://localhost:3000'
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
