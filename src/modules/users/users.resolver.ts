import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersSvc: UsersService) {}

  @Query(() => UserEntity, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  async findOne(
    @SessionUser() sessionUser: IJwtPayload,
    @Args('id', { type: () => ID, nullable: true }) id: number,
  ) {
    const user = await this.usersSvc.findOne(+id || sessionUser.userId);
    if (!user) throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    return user;
  }

  @Mutation(() => UserEntity, { name: 'createUser' })
  async create(@Args('input') input: CreateUserInput) {
    const result = await this.usersSvc.create(input);
    const user = await this.usersSvc.findOne(result.id);
    return user;
  }
}
