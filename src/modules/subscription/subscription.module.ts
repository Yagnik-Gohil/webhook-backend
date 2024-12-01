import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Token } from '@modules/token/entities/token.entity';
import { EventHistory } from '@modules/event-history/entities/event-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Token, EventHistory])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
