import { Subscription } from '@modules/subscription/entities/subscription.entity';
import { User } from '@modules/user/entities/user.entity';
import { DefaultEntity } from '@shared/entities/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class EventHistory extends DefaultEntity {
  @Column({
    type: 'character varying',
  })
  event: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'jsonb',
  })
  payload: JSON;

  @ManyToOne(() => User, (user) => user.event_history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.event_history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;
}
