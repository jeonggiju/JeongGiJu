import { Module } from '@nestjs/common';
import { CheckListResolver } from './checkList.resolver';
import { CheckListService } from './checkList.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/checkList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckList])],
  providers: [CheckListResolver, CheckListService],
})
export class CheckListModule {}
