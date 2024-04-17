import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';

export class DataEntityRepository extends Repository<DataEntity> {}
