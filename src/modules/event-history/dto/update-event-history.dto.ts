import { PartialType } from '@nestjs/mapped-types';
import { CreateEventHistoryDto } from './create-event-history.dto';

export class UpdateEventHistoryDto extends PartialType(CreateEventHistoryDto) {}
