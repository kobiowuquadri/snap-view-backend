import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    @Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async verifyIdToken(idToken: string): Promise<string> {
    const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(idToken);
    return decodedToken.uid;
  }
}
