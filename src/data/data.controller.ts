import { Controller, Post, Get, Body, UploadedFile, UseInterceptors, Res } from '@nestjs/common'
import { DataService } from './data.service'
import { DataDto } from './dto/data.dto'
import { DataEntity } from './entities/data.entity'
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path'
import * as fs from 'fs'
import * as path from 'path'

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
      destination: path.join(__dirname, '..', 'uploads'),
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')
        callback(null, `${randomName}${extname(file.originalname)}`)
      },
    }),
  }))
  async uploadImage(@UploadedFile() file): Promise<string> {
    return file.filename
  }

  @Get('images')
  async getAllImages(@Res() res): Promise<void> {
    const directoryPath = path.join(__dirname, '..', 'uploads')

    try {
      const filenames = fs.readdirSync(directoryPath)

      const imageUrls = filenames.map((filename) => {
        return `http://localhost:5000/images/${filename}`
      })

      res.json(imageUrls)
    } catch (error) {
      console.error('Error fetching images:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
