import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as express from 'express'
import * as path from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Enable CORS
  app.enableCors()

  // static file
  // Assuming uploads directory is inside the src directory
  app.use('/images', express.static(path.join(__dirname, '..', 'uploads')))

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')))


  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(5000)
}
bootstrap()
