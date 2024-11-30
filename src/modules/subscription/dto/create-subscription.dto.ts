export class CreateSubscriptionDto {
  source: string;
  events: string[];
  callback_url: string;
}
