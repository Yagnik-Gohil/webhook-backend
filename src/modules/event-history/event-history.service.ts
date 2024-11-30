import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventHistory } from './entities/event-history.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EventHistoryService {
  constructor(
    @InjectRepository(EventHistory)
    private readonly eventHistoryRepository: Repository<EventHistory>,
  ) {}
  async findAll(
    where: FindManyOptions<EventHistory>,
  ): Promise<[EventHistory[], number]> {
    const [list, count] = await this.eventHistoryRepository.findAndCount(where);
    return [plainToInstance(EventHistory, list), count];
  }
}
