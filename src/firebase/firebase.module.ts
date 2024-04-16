import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../config/serviceAccountKey.json';

@Module({
  providers: [
    {
      provide: 'FirebaseAdmin',
      useFactory: () => {
        const firebaseAdmin = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
        return firebaseAdmin;
      },
    },
  ],
  exports: ['FirebaseAdmin'],
})
export class FirebaseModule {}