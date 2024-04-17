import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from './data.entity';
import {DataEntityRepository} from './data.respository'; 

@Module({
  imports: [TypeOrmModule.forFeature([DataEntity])],
  providers: [DataEntityRepository],
  exports: [DataEntityRepository], 
})
export class DataModule {}