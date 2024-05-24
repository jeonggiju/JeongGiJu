import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiaryService } from './diary.service';
import { Diary } from './entities/diary.entity';
import { CreateDiaryInput } from './dto/create-diary.input';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class DiaryResolver {
  constructor(private readonly diaryService: DiaryService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Diary])
  findAllDiary(): Promise<Diary[]> {
    return this.diaryService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Diary)
  createDiary(
    @Context() context: IContext,
    @Args('createDiaryInput') createDiaryInput: CreateDiaryInput,
  ): Promise<Diary> {
    return this.diaryService.create({
      userId: context.req.user.id,
      createDiaryInput,
    });
  }
}
