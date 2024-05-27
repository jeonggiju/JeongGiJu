import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { CheckList } from './entities/checkList.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCheckListInput } from './dto/create-checkList.input';

interface ICheckListServiceCreate {
  userId: string;
  createCheckListInput: CreateCheckListInput;
}

interface ICheckListServiceFindByCreatedAt {
  date: Date;
}

@Injectable()
export class CheckListService {
  constructor(
    @InjectRepository(CheckList)
    private readonly checkListRepository: Repository<CheckList>,
  ) {}

  async findByCreatedAt({
    date,
  }: ICheckListServiceFindByCreatedAt): Promise<CheckList> {
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return await this.checkListRepository.findOne({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });
  }

  findAll({ userId }): Promise<CheckList[]> {
    return this.checkListRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
  }

  async create({
    userId,
    createCheckListInput,
  }: ICheckListServiceCreate): Promise<CheckList> {
    // const today = new Date();
    // const isExist = await this.findByCreatedAt({ date: today });

    // if (isExist) {
    //   throw new ConflictException('일기는 하루에 한 개 씩.');
    // }

    const result = this.checkListRepository.create({
      ...createCheckListInput,
      user: {
        id: userId,
      },
    });

    return await this.checkListRepository.save(result);
  }
}
