import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersService, UsersResolver],
  exports: [...usersProviders, UsersService],
})
export class UsersModule {}
