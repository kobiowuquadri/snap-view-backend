import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { FirebaseModule } from './firebase/firebase.module'
import { DataModule } from './data/data.module'
import { DataController } from './data/data.controller'
import { DataService } from './data/data.service'
import { DataEntity } from './data/entities/data.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        entities: [DataEntity],
        logging: true, 
        synchronize: true,
        retryAttempts: 5, 
        retryDelay: 3000, 
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    DataModule, 
    AuthModule,
    FirebaseModule,
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class AppModule {}