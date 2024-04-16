import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config(); 

@Module({
  providers: [
    {
      provide: 'FirebaseAdmin',
      useFactory: () => {
        const firebaseAdmin = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.PROJECT_ID,
            privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.CLIENT_EMAIL,
            client_id: process.env.CLIENT_ID,
            authUri: process.env.AUTH_URI,
            tokenUri: process.env.TOKEN_URI,
            auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
          } as admin.ServiceAccount), 
        });
        return firebaseAdmin;
      },
    },
  ],
  exports: ['FirebaseAdmin'],
})
export class FirebaseModule {}
