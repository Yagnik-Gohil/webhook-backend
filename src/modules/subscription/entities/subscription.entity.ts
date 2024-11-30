import { Source } from '@modules/source/entities/source.entity';
import { User } from '@modules/user/entities/user.entity';
import { DefaultStatus } from '@shared/constants/enum';
import { DefaultEntity } from '@shared/entities/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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
}
