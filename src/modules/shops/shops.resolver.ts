import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShopsService } from './shops.service';
import { Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';

@Resolver(() => Shop)
export class ShopsResolver {
  constructor(private readonly shopsService: ShopsService) {}

  @Mutation(() => Shop)
  createShop(@Args('createShopInput') createShopInput: CreateShopInput) {
    return this.shopsService.create(createShopInput);
  }

  @Query(() => [Shop], { name: 'shops' })
  findAll() {
    return this.shopsService.findAll();
  }

  @Query(() => Shop, { name: 'shop' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shopsService.findOne(id);
  }

  @Mutation(() => Shop)
  updateShop(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return this.shopsService.update(updateShopInput.id, updateShopInput);
  }

  @Mutation(() => Shop)
  removeShop(@Args('id', { type: () => Int }) id: number) {
    return this.shopsService.remove(id);
  }
}
