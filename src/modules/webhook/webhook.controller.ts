import { Body, Controller, Post, Res } from '@nestjs/common';
import response from '@shared/response';
import { Response } from 'express';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { EventHistoryService } from '@modules/event-history/event-history.service';
import { WebhookGateway } from './webhook.gateway';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookGateway: WebhookGateway,
    private readonly subscriptionService: SubscriptionService,
    private readonly eventHistoryService: EventHistoryService,
  ) {}

  @Post()
  async webhook(@Body() payload: any, @Res() res: Response) {
    const { event, source } = payload;

    const subscribedUsers = await this.subscriptionService.findSubscribedUsers(
      source,
      event,
    );

    const eventEntries = subscribedUsers.map((data) => ({
      event,
      description: `${source} event occurred`,
      payload,
      user: { id: data.user_id },
      subscription: { id: data.id },
    }));
    await this.eventHistoryService.save(eventEntries);

    subscribedUsers.forEach((data) => {
      this.webhookGateway.emitToUserDevices(
        data.user_id,
        'webhook-event',
        payload,
      );
    });

    return response.successCreate(
      {
        message: `Webhook event '${event}' received successfully`,
        data: {},
      },
      res,
    );
  }
}
