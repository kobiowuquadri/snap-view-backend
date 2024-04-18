import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class DataDto {
  @IsNotEmpty()
  @IsString()
  companyName: string
  
  @IsNotEmpty()
  @IsNumber()
  numOfUsers: number
  
  @IsNotEmpty()
  @IsNumber()
  numOfProducts: number
}
