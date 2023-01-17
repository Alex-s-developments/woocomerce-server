import { DataSource } from 'typeorm';
import { DB_PROVIDE } from 'src/database/database.constant';
import { UserEntity } from './entities/user.entity';
import { USER_REPOSITORY } from './users.constants';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DB_PROVIDE],
  },
];
