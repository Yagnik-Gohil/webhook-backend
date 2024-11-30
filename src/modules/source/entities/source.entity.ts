import { Subscription } from '@modules/subscription/entities/subscription.entity';
import { DefaultStatus } from '@shared/constants/enum';
import { DefaultEntity } from '@shared/entities/default.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Source extends DefaultEntity {
  @Column({
    type: 'enum',
    enum: DefaultStatus,
    default: DefaultStatus.ACTIVE,
  })
  status: DefaultStatus;

  @Column({
    type: 'character varying',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'json',
  })
  events: string[];

  @Column({
    type: 'character varying',
  })
  thumbnail: string;

  @OneToMany(() => Subscription, (subscription) => subscription.source)
  subscription: Subscription[];
}
