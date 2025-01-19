/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de CORS avec plusieurs origines
  app.enableCors({
    origin:'task-master-frontend-olive.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    // allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    allowedHeaders: '*',
    credentials: true, // Accepte les cookies pour les requêtes CORS
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1'); // Préfixe global pour toutes les routes

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
