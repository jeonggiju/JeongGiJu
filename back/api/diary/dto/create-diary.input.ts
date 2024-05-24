import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDiaryInput {
  @Field(() => String)
  diary: string;
}
