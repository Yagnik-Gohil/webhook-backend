import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

  async findAllUnSubscribedSource(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<[Source[], number]> {
    const [list, count] = await this.sourceRepository
      .createQueryBuilder('so')
      .leftJoin(
        'subscription',
        'su',
        'so.id = su.source_id AND su.user_id = :userId',
        { userId },
      )
      .where('su.id IS NULL')
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
    return [plainToInstance(Source, list), count];
  }

  async findAllSubscribedSource(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<[Source[], number]> {
    const [list, count] = await this.sourceRepository
      .createQueryBuilder('so')
      .innerJoin(
        'subscription',
        'su',
        'so.id = su.source_id AND su.user_id = :userId',
        { userId },
      )
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
    return [plainToInstance(Source, list), count];
  }
}
