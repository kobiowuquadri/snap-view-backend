import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verifyToken')
  async verifyToken(@Body() body: { idToken: string }): Promise<string> {
    const uid = await this.authService.verifyIdToken(body.idToken)
    return `User ID: ${uid}`
  }
}
