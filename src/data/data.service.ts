import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DataEntity } from './data.entity';
import { DataEntityRepository } from './data.respository';

@Injectable()
export class DataService {
  constructor(
    @Inject(forwardRef(() => DataEntityRepository))
    private readonly dataEntityRepository: DataEntityRepository,
  ) {}

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