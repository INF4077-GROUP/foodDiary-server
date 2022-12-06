import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { Neo4jModule } from 'neo4j-module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards';
import { UserModule } from './domain/nodes/user/user.module';
import { UsersModule } from './users/users.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { DailyEatingModule } from './dailyEating/daily-eating.module';
import { CommonRepoModule } from './domain/nodes/common/common.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,

      validationSchema: Joi.object({
        DATABASE_SCHEME: Joi.string().default('bolt'),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
    Neo4jModule.forRootAsync({
      scheme: 'bolt',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    }),

    AuthModule,
    CommonRepoModule,
    UserModule,
    UsersModule,
    DailyEatingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
