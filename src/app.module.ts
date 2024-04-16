import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: async (configservice: ConfigService) => ({
        type: 'postgres',
        host: configservice.get('DB_HOST'),
        port: configservice.get('DB_PORT'),
        username: configservice.get('DB_USERNAME'),
        password: configservice.get('DB_PASSWORD'),
        database: configservice.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        logging: true, 
      })
    }),
    AuthModule,
    FirebaseModule,
  ],
})
export class AppModule {}
