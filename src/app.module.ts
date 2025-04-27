import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',}),
    UserModule,
    MongooseModule.forRoot(`${process.env.DB_CONNECTION}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`),

  ],
})
export class AppModule {}
