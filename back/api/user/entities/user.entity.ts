import { Field, ObjectType } from '@nestjs/graphql';
import { CheckList } from 'api/checkList/entities/checkList.entity';
import { Diary } from 'api/diary/entities/diary.entity';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @IsNotEmpty()
  @Column()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Column()
  @Field(() => String)
  password: string;

  @OneToMany(() => CheckList, (checkList) => checkList.user, {
    cascade: ['insert', 'update', 'soft-remove'],
    nullable: true,
  })
  @Field(() => [CheckList], { nullable: true })
  checkList?: CheckList[];

  @OneToMany(() => Diary, (diary) => diary.user, {
    cascade: ['insert', 'update', 'soft-remove'],
    nullable: true,
  })
  @Field(() => [Diary], { nullable: true })
  diary?: Diary[];

  @CreateDateColumn()
  createdAt: Date;
}
