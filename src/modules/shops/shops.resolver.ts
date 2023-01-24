import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { ShopsService } from './shops.service';
import { ShopEntity } from './entities/shop.entity';
import { CreateShopInput } from './inputs/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => ShopEntity)
export class ShopsResolver {
  constructor(
    private readonly shopsSvc: ShopsService,
    private readonly usersSvc: UsersService,
  ) {}

  @Mutation(() => ShopEntity)
  @UseGuards(GqlAuthGuard)
  async createShop(
    @SessionUser() sessionUser: IJwtPayload,
    @Args('input') createShopInput: CreateShopInput,
  ) {
    const result = await this.shopsSvc.create(
      createShopInput,
      sessionUser.userId,
    );
    const shop = await this.shopsSvc.findOne(result.id);
    return shop;
  }

  @Query(() => [ShopEntity], { name: 'shopsList' })
  findAll() {
    return this.shopsSvc.findAll();
  }

  @Query(() => ShopEntity, { name: 'shop' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    const shop = await this.shopsSvc.findOne(id);
    if (!shop) throw new HttpException('shop not exist', HttpStatus.NOT_FOUND);
    return shop;
  }

  @Mutation(() => ShopEntity)
  updateShop(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return this.shopsSvc.update(updateShopInput.id, updateShopInput);
  }

  @Mutation(() => ShopEntity)
  removeShop(@Args('id', { type: () => Int }) id: number) {
    return this.shopsSvc.remove(id);
  }

  @ResolveField(() => UserEntity, { name: 'ownerRelation' })
  findShopOwner(@Root() shop: ShopEntity) {
    return this.usersSvc.findOneByShopId(shop.id);
  }
}
