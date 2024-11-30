export class CreateEventHistoryDto {
  event: string;
  description: string;
  payload: JSON;
  user: { id: string };
  subscription: { id: string };
}
