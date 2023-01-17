import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from '../entities/product.entity';

@ObjectType('ProductsList')
export class ProductsListTypeDef {
  @Field(() => [ProductEntity])
  items: ProductEntity[];
  @Field(() => Int)
  count: number;

  constructor({ items, count }: { items: ProductEntity[]; count: number }) {
    this.items = items;
    this.count = count;
  }
}
