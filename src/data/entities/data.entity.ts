import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('data')
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  companyName: string

  @Column()
  numOfUsers: number

  @Column()
  numOfProducts: number

  @Column()
  percentage: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
