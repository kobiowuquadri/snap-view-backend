import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DataModule } from './data/data.module';
import { DataController } from './data/data.controller';
import { DataService } from './data/data.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        logging: true, 
        synchronize: true,
        retryAttempts: 5, // Number of retry attempts
        retryDelay: 3000, 
        ssl: {
          rejectUnauthorized: false, // For development only; consider configuring SSL properly for production
        },
      }),
    }),
    AuthModule,
    FirebaseModule,
    DataModule, 
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class AppModule {}