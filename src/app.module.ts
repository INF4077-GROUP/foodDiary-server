import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Neo4jModule } from 'neo4j-module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './domain/nodes/user/user.module';
import { UsersModule } from './users/users.module';
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
    UserModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
