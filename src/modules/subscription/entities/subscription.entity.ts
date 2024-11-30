import { EventHistory } from '@modules/event-history/entities/event-history.entity';
import { Source } from '@modules/source/entities/source.entity';
import { User } from '@modules/user/entities/user.entity';
import { DefaultStatus } from '@shared/constants/enum';
import { DefaultEntity } from '@shared/entities/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Subscription extends DefaultEntity {
  @Column({
    type: 'enum',
    enum: DefaultStatus,
    default: DefaultStatus.ACTIVE,
  })
  status: DefaultStatus;

  @Column({
    type: 'json',
  })
  events: string[];

  @Column({
    type: 'character varying',
  })
  callback_url: string;

  @ManyToOne(() => User, (user) => user.subscription, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Source, (source) => source.subscription, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'source_id' })
  source: Source;

  @OneToMany(() => EventHistory, (event_history) => event_history.subscription)
  event_history: EventHistory[];
}
