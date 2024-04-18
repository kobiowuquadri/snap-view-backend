import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { FirebaseModule } from '../firebase/firebase.module'
import { AuthMiddleware } from './auth.middleware'

@Module({
  imports: [FirebaseModule], 
  providers: [AuthMiddleware],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
