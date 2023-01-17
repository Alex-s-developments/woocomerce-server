import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  async findOne(
    @SessionUser() sessionUser: IJwtPayload,
    @Args('id', { type: () => ID, nullable: true }) id: number,
  ) {
    const user = await this.usersService.findOne(+id || sessionUser.userId);
    if (!user) throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    return user;
  }
}
