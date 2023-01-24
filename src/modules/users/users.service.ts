import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  CreateUserInput,
  mapCreateUserInputToUser,
} from './inputs/create-user.input';
import { USER_REPOSITORY } from './users.constants';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepo: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string) {
    const user = await this.usersRepo.findOneBy({ username });
    return user;
  }

  async findOneByShopId(shopId: number) {
    const user = await this.usersRepo.findOne({
      where: {
        shops: { id: shopId },
      },
    });
    return user;
  }

  async findOne(id: number) {
    return this.usersRepo.findOneBy({ id });
  }

  async create(input: CreateUserInput) {
    const user = mapCreateUserInputToUser(input);
    const result = await this.usersRepo.insert(user);
    user.id = result.identifiers[0].id;
    return user;
  }
}
