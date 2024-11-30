import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfiguration } from 'config/configuration';
import { envSchema } from 'config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from 'config/database';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { AuthModule } from './modules/auth/auth.module';
import { SourceModule } from './modules/source/source.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { EventHistoryModule } from './modules/event-history/event-history.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../../config/env/${process.env.NODE_ENV}.env`,
      load: [envConfiguration],
      isGlobal: true,
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => database(configService),
      inject: [ConfigService],
    }),
    UserModule,
    TokenModule,
    AuthModule,
    SourceModule,
    SubscriptionModule,
    EventHistoryModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
