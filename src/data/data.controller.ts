import { Controller, Post, Get, Body } from '@nestjs/common';
import { DataService } from './data.service';
import { DataDto } from './dto/data.dto';
import { DataEntity } from './data.entity';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Middleware to apply CORS to specific routes
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }
}

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
