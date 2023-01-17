import { Injectable, Inject } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import {
  CreateProductInput,
  mapCreateProductDtoToProduct,
} from './dto/create-product.input';
import { GetProductsListArgs } from './dto/get-products-list.args';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ProductEntity } from './entities/product.entity';
import {
  PRODUCT_OPTION_REPOSITORY,
  PRODUCT_REPOSITORY,
} from './product.constants';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private productRepo: Repository<ProductEntity>,
    @Inject(PRODUCT_OPTION_REPOSITORY)
    private productOptionRepo: Repository<ProductOptionEntity>,
  ) {}

  async create(input: CreateProductInput) {
    const product = mapCreateProductDtoToProduct(input);
    const result = await this.productRepo.insert(product);
    product.id = result.identifiers[0].id;
    return product;
  }

  async findAll(args: GetProductsListArgs) {
    const take = args.take || 50;
    const skip = args.skip || 0;
    const items = await this.productRepo.find({
      where: { deletedAt: IsNull() },
      take,
      skip,
    });
    return items;
  }

  async count() {
    const count = await this.productRepo.count({
      where: { deletedAt: IsNull() },
    });
    return count;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id, deletedAt: IsNull() },
    });
    return product;
  }

  async update(input: UpdateProductInput) {
    const { id, ...data } = input;
    await this.productRepo.update({ id }, data);
    const product = await this.findOne(id);
    return product;
  }

  async remove(id: number) {
    const result = await this.productRepo.update(
      { id },
      { deletedAt: new Date() },
    );
    const isDeleted = Boolean(result.affected);
    return isDeleted;
  }

  async findOptions(productId: number) {
    const options = await this.productOptionRepo.find({
      where: { product: { id: productId } },
    });
    return options;
  }
}
