import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';
import { Nutritionist } from '../../nutritionists/entities/nutritionist.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column({ type: 'decimal' })
  activity_factor: number;

  @Column()
  weight: number;

  @Column({ type: 'decimal' })
  height: number;

  @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.patients, {})
  nutritionist: Nutritionist | string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.patient, {})
  evaluations: Evaluation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
