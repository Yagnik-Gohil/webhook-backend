import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

  async findAll(where: FindManyOptions<Source>): Promise<[Source[], number]> {
    const [list, count] = await this.sourceRepository.findAndCount(where);
    return [plainToInstance(Source, list), count];
  }
}
