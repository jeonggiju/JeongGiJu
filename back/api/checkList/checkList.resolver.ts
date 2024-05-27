import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckListService } from './checkList.service';
import { CheckList } from './entities/checkList.entity';
import { CreateCheckListInput } from './dto/create-checkList.input';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
// import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class CheckListResolver {
  constructor(private readonly checkListService: CheckListService) {}

  // @UseGuards(GqlAuthGuard('access'))
  // @Query(() => [CheckList])
  // findAllCheckList(@Context() context: IContext): Promise<CheckList[]> {
  //   return this.checkListService.findAll({ userId: context.req.user.id });
  // }

  // @UseGuards(GqlAuthGuard('access'))
  // @Mutation(() => CheckList)
  // createCheckList(
  //   @Context() context: IContext,
  //   @Args('createCheckListInput') createCheckListInput: CreateCheckListInput,
  // ): Promise<CheckList> {
  //   return this.checkListService.create({
  //     userId: context.req.user.id,
  //     createCheckListInput,
  //   });
  // }

  @Query(() => [CheckList])
  findAllCheckList(@Args('userId') userId: string): Promise<CheckList[]> {
    return this.checkListService.findAll({ userId });
  }

  // @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => CheckList)
  createCheckList(
    @Args('createCheckListInput') createCheckListInput: CreateCheckListInput,
    @Args('userId') userId: string,
  ): Promise<CheckList> {
    return this.checkListService.create({
      userId,
      createCheckListInput,
    });
  }
}
