import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductOptionEntity } from '../entities/product-option.entity';

@ObjectType('ProductOptionsList')
export class ProductOptionsListTypeDef {
  @Field(() => [ProductOptionEntity])
  items: ProductOptionEntity[];

  @Field(() => Int)
  count: number;

  constructor({
    items,
    count,
  }: {
    items: ProductOptionEntity[];
    count: number;
  }) {
    this.items = items;
    this.count = count;
  }
}
