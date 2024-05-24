import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckListInput {
  @Field(() => Boolean)
  exercise: boolean;

  @Field(() => Boolean)
  smoking: boolean;

  @Field(() => Date)
  studyTime: Date;
}
