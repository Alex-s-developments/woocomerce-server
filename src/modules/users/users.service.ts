import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { USER_REPOSITORY } from './users.constants';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepo: Repository<UserEntity>,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOneByUsername(username: string): Promise<User | undefined> {
    console.log('username', username);
    return this.users.find((user) => user.username === username);
  }

  async findOne(id: number) {
    return this.usersRepo.findOneBy({ id });
  }
}
