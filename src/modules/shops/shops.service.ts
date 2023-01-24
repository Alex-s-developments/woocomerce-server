import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CreateShopInput,
  mapCreateShopInputToShop,
} from './inputs/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { ShopEntity } from './entities/shop.entity';
import { SHOP_REPOSITORY } from './shops.constants';

@Injectable()
export class ShopsService {
  constructor(
    @Inject(SHOP_REPOSITORY)
    private shopRepo: Repository<ShopEntity>,
  ) {}

  async create(input: CreateShopInput, ownerId: number) {
    const shop = mapCreateShopInputToShop(input, ownerId);
    const result = await this.shopRepo.insert(shop);
    shop.id = result.identifiers[0].id;
    return shop;
  }

  async findAll() {
    const shops = await this.shopRepo.find();
    return shops;
  }

  findOne(id: number) {
    return this.shopRepo.findOne({ where: { id }, relations: { owner: true } });
  }

  findOneByProduct(productId: number) {
    return this.shopRepo.findOne({ where: { products: { id: productId } } });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateShopInput: UpdateShopInput) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
