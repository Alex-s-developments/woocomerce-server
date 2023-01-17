import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { ShopEntity } from './entities/shop.entity';
import { SHOP_REPOSITORY } from './shops.constants';

@Injectable()
export class ShopsService {
  constructor(
    @Inject(SHOP_REPOSITORY)
    private shopRepo: Repository<ShopEntity>,
  ) {}

  create(createShopInput: CreateShopInput) {
    return 'This action adds a new shop';
  }

  async findAll() {
    const shops = await this.shopRepo.find();
    return shops;
  }

  findOne(id: number) {
    return this.shopRepo.findOneBy({ id });
  }

  update(id: number, updateShopInput: UpdateShopInput) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
