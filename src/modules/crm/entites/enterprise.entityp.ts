import { CategoryEnterprise } from 'src/modules/crm-categories/entities/categorie.entityp';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tracking } from './tracking.entityp';

@Entity()
export class Enterprise {
  @PrimaryGeneratedColumn()
  enterpriseId: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  street: string;

  @Column()
  phone: string;

  @Column()
  reviewCount: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  stars: number;

  @Column()
  urlGoogleMaps: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  website: string;

  @Column({
    type: 'jsonb',
  })
  schedules: Array<{
    day: string;
    hours: string;
  }>;

  @ManyToOne(() => CategoryEnterprise, (category) => category.enterprises)
  category: CategoryEnterprise;

  @OneToMany(() => Tracking, (tracking) => tracking.enterprise)
  trackings: Tracking[];

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
