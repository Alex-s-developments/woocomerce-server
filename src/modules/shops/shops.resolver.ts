import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ShopsService } from './shops.service';
import { ShopEntity } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => ShopEntity)
export class ShopsResolver {
  constructor(private readonly shopsService: ShopsService) {}

  @Mutation(() => ShopEntity)
  createShop(@Args('createShopInput') createShopInput: CreateShopInput) {
    return this.shopsService.create(createShopInput);
  }

  @Query(() => [ShopEntity], { name: 'shopsList' })
  findAll() {
    return this.shopsService.findAll();
  }

  @Query(() => ShopEntity, { name: 'shop' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    const shop = await this.shopsService.findOne(id);
    if (!shop) throw new HttpException('shop not exist', HttpStatus.NOT_FOUND);
    return shop;
  }

  @Mutation(() => ShopEntity)
  updateShop(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return this.shopsService.update(updateShopInput.id, updateShopInput);
  }

  @Mutation(() => ShopEntity)
  removeShop(@Args('id', { type: () => Int }) id: number) {
    return this.shopsService.remove(id);
  }
}
