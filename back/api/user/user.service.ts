import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
interface IUserServiceFindUserByEmail {
  userEmail: string;
}

interface IUserServiceCreate {
  createUserInput: CreateUserInput;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserByEmail({ userEmail }: IUserServiceFindUserByEmail): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: userEmail,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create({ createUserInput }: IUserServiceCreate): Promise<User> {
    const { email, password } = createUserInput;

    const isExists = await this.findUserByEmail({ userEmail: email });
    console.log(isExists);
    if (isExists) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }

    const saltOrRounds = 10;
    const result = await this.userRepository.save({
      email,
      password: await bcrypt.hash(password, saltOrRounds),
    });

    return result;
  }
}
