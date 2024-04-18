import {Injectable } from '@nestjs/common';
import { DataEntity } from './entities/data.entity';
import { Connection, Repository } from 'typeorm';


@Injectable()
export class DataService {
  private readonly dataEntityRepository: Repository<DataEntity>;
  constructor(private readonly connection: Connection) {
    this.dataEntityRepository = this.connection.getRepository(DataEntity);
  }


  async saveData(
    companyName: string,
    numOfUsers: number,
    numOfProducts: number,
    percentage: number,
  ): Promise<DataEntity> {
    const newData = this.dataEntityRepository.create({
      companyName,
      numOfUsers,
      numOfProducts,
      percentage,
    });
    return await this.dataEntityRepository.save(newData);
  }

  async getRecentData(): Promise<DataEntity | null> {
    return await this.dataEntityRepository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}