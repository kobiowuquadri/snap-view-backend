import { EntityRepository, Repository } from 'typeorm';
import { DataEntity } from './data.entity';

@EntityRepository(DataEntity)
export class DataEntityRepository extends Repository<DataEntity> {}