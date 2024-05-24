import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';

interface IDiaryServiceFindByCreatedAt {
  date: Date;
}

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}

  async findAll(): Promise<Diary[]> {
    return await this.diaryRepository.find();
  }

  async findByCreatedAt({
    date,
  }: IDiaryServiceFindByCreatedAt): Promise<Diary> {
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return await this.diaryRepository.findOne({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });
  }

  async create({ userId, createDiaryInput }): Promise<Diary> {
    // const today = new Date();
    // const isExist = await this.findByCreatedAt({ date: today });

    // if (isExist) {
    //   throw new ConflictException('일기는 하루에 한 개 씩.');
    // }
    const result = this.diaryRepository.create({
      diary: createDiaryInput.diary,
      user: {
        id: userId,
      },
    });
    return await this.diaryRepository.save(result);
  }
}
