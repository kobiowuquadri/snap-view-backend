import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split(' ')[1];
    try {
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(authToken);
      req['user'] = { uid: decodedToken.uid };
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
