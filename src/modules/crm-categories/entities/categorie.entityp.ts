import { Enterprise } from 'src/modules/crm/entites/enterprise.entityp';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEnterprise {
  @PrimaryGeneratedColumn()
  categoryEnterpriseId: number;

  @Column()
  name: string;

  @Column({
    default: true,
  })
  status: boolean;

  @Column()
  icon: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Enterprise, (enterprise) => enterprise.category)
  enterprises: Enterprise[];
}
