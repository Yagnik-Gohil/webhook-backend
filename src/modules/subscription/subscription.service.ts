import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { MESSAGE } from '@shared/constants/constant';
import { DefaultStatus } from '@shared/constants/enum';
import { EventHistory } from '@modules/event-history/entities/event-history.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(EventHistory)
    private readonly eventHistoryRepository: Repository<EventHistory>,
  ) {}
  async create(createSubscriptionDto: CreateSubscriptionDto, userId: string) {
    const { source, ...subscription } = createSubscriptionDto;

    const isExists = await this.subscriptionRepository.findOne({
      where: {
        user: { id: userId },
        source: { id: source },
        status: DefaultStatus.ACTIVE,
      },
    });

    if (isExists) {
      throw new BadRequestException(MESSAGE.ALREADY_EXISTS('Subscription'));
    }

    const data = await this.subscriptionRepository.save({
      ...subscription,
      source: { id: source },
      user: { id: userId },
    });

    return plainToInstance(Subscription, data);
  }

  async findAll(
    where: FindManyOptions<Subscription>,
  ): Promise<[Subscription[], number]> {
    const [list, count] = await this.subscriptionRepository.findAndCount(where);
    return [plainToInstance(Subscription, list), count];
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
    userId: string,
  ) {
    // Check if user is editing it's own subscription
    const isUserSubscribed = await this.subscriptionRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });
    if (!isUserSubscribed) {
      throw new BadRequestException(MESSAGE.METHOD_NOT_ALLOWED);
    }

    const { source, ...subscription } = updateSubscriptionDto;

    // If a subscription is already exists with same source id for current user.
    const isExists = await this.subscriptionRepository.findOne({
      where: {
        id: Not(id),
        user: { id: userId },
        source: { id: source },
        status: DefaultStatus.ACTIVE,
      },
    });

    if (isExists) {
      throw new BadRequestException(MESSAGE.ALREADY_EXISTS('Subscription'));
    }

    const result = await this.subscriptionRepository.update(id, {
      ...subscription,
      source: { id: source },
    });
    return result;
  }

  async remove(id: string, userId: string) {
    const result = await this.subscriptionRepository.softDelete({
      id: id,
      user: { id: userId },
      deleted_at: IsNull(),
    });

    if (result.affected) {
      await this.eventHistoryRepository.delete({
        subscription: { id },
      });
    }
    return result;
  }

  async findSubscribedUsers(name: string, event: string) {
    const list = await this.subscriptionRepository
      .createQueryBuilder('su')
      .select(['su.id AS id', 'su.user_id AS user_id'])
      .leftJoin('source', 'so', 'so.id = su.source_id')
      .where('su.status = :status', { status: DefaultStatus.ACTIVE })
      .andWhere('so.name = :name', { name })
      .andWhere('su.events::jsonb @> :event::jsonb', { event: `["${event}"]` })
      .getRawMany();

    return list;
  }
}
