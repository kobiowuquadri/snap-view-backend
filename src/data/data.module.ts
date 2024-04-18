import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from './entities/data.entity';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataEntity])],
  controllers: [DataController],
  providers: [DataService, DataEntity],

})
export class DataModule {}