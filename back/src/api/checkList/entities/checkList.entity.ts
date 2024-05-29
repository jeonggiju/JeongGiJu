import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class CheckList {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('longtext')
  @Field(() => String)
  diary: string;

  @Column()
  @Field(() => Date)
  studyTime: Date;

  @Column()
  @Field(() => Date)
  wakeTime: Date;

  @Column()
  @Field(() => Date)
  sleepTime: Date;

  @Column()
  @Field(() => Boolean)
  smoking: boolean;

  @Column()
  @Field(() => Boolean)
  anaerobic: boolean;

  @Column()
  @Field(() => Number)
  weight: number;

  @Column()
  @Field(() => Boolean)
  cardio: boolean;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
