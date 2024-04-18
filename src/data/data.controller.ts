import { Controller, Post, Get, Body, UploadedFile, UseInterceptors, Res, Param } from '@nestjs/common'
import { DataService } from './data.service'
import { DataDto } from './dto/data.dto'
import { DataEntity } from './entities/data.entity'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path'

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  }
}

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('submit')
  async submitData(@Body() dataDto: DataDto): Promise<DataEntity> {
    const { companyName, numOfUsers, numOfProducts } = dataDto
    const percentage = (numOfUsers / numOfProducts) * 100
    return await this.dataService.saveData(companyName, numOfUsers, numOfProducts, percentage)
  }

  @Get('recent')
  async getRecentData(): Promise<DataEntity | null> {
    return await this.dataService.getRecentData()
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')
        callback(null, `${randomName}${extname(file.originalname)}`)
      }
    })
}))
async uploadImage(@UploadedFile() file): Promise<string> {
  return file.path
}

@Get('images/:imageName')
  async getImage(@Param('imageName') imageName, @Res() res): Promise<any> {
    return res.sendFile(imageName, { root: 'uploads' }) 
  }
}
