import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Enterprise } from './enterprise.entityp';

export enum StatusTracking {
  PENDING = 'PENDING',
  ANSWERED = 'ANSWERED',
  IN_PROGRESS = 'IN_PROGRESS',
}

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn()
  trackingId: number;

  @Column()
  answered: boolean;

  @Column()
  date: Date;

  @Column()
  channel: string;

  @Column({
    enum: StatusTracking,
    type: 'enum',
  })
  status: StatusTracking;

  @Column({
    type: 'text',
  })
  notes: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.trackings)
  enterprise: Enterprise;
}
