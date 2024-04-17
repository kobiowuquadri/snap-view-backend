import { Body, Controller, Post, Get } from '@nestjs/common';
import { DataService } from './data.service';
import { DataDto } from './dto/data.dto';
import { DataEntity } from './data.entity';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('submit')
  async submitData(@Body() dataDto: DataDto): Promise<DataEntity> {
    const { companyName, numOfUsers, numOfProducts } = dataDto;
    const percentage = (numOfUsers / numOfProducts) * 100;
    return await this.dataService.saveData(companyName, numOfUsers, numOfProducts, percentage);
  }

  @Get('recent')
  async getRecentData(): Promise<DataEntity | null> {
    return await this.dataService.getRecentData();
  }
}
