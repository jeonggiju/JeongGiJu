import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckListService } from './checkList.service';
import { CheckList } from './entities/checkList.entity';
import { CreateCheckListInput } from './dto/create-checkList.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'api/auth/guards/gql-auth.guard';
import { IContext } from 'api/common/interfaces/common';

@Resolver()
export class CheckListResolver {
  constructor(private readonly checkListService: CheckListService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [CheckList])
  findAllCheckList(): Promise<CheckList[]> {
    return this.checkListService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => CheckList)
  createCheckList(
    @Context() context: IContext,
    @Args('createCheckListInput') createCheckListInput: CreateCheckListInput,
  ): Promise<CheckList> {
    return this.checkListService.create({
      userId: context.req.user.id,
      createCheckListInput,
    });
  }
}
