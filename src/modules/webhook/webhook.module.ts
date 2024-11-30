import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookGateway } from './webhook.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '@modules/token/entities/token.entity';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { Subscription } from '@modules/subscription/entities/subscription.entity';
import { EventHistoryService } from '@modules/event-history/event-history.service';
import { EventHistory } from '@modules/event-history/entities/event-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, Subscription, EventHistory])],
  controllers: [WebhookController],
  providers: [
    WebhookGateway,
    WebhookService,
    SubscriptionService,
    EventHistoryService,
  ],
})
export class WebhookModule {}
