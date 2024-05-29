import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckListInput {
  @Field(() => Boolean)
  anaerobic: boolean;

  @Field(() => Boolean)
  cardio: boolean;

  @Field(() => Boolean)
  smoking: boolean;

  @Field(() => Date)
  studyTime: Date;

  @Field(() => Date)
  wakeTime: Date;

  @Field(() => Date)
  sleepTime: Date;

  @Field(() => String)
  diary: string;

  @Field(() => Number)
  weight: number;
}
