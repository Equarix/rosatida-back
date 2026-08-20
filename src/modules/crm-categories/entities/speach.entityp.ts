import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEnterprise } from './categorie.entityp';

@Entity()
export class Speach {
  @PrimaryGeneratedColumn()
  speachId: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  speach: string;

  @ManyToOne(() => CategoryEnterprise, (category) => category.speaches)
  category: CategoryEnterprise;
}
