import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { IProduct } from '../interfaces/Product';

@ObjectType('Product')
export class ProductType implements IProduct {
  @Field(() => ID, { description: 'product id' })
  id: number;

  @Field(() => String, { description: 'product name' })
  name: string;

  @Field(() => Date, { description: 'created at datetime' })
  createdAt: Date;

  @Field(() => Date, { description: 'updated at datetime' })
  updatedAt: Date;

  @Field(() => Date, { description: 'deleted at datetime', nullable: true })
  deletedAt: Date;
}

@ObjectType('ProductsList')
export class ProductsListType {
  @Field(() => [ProductType])
  items!: ProductType[];

  @Field(() => Int)
  count!: number;

  constructor({ items, count }: { items: ProductType[]; count: number }) {
    this.items = items;
    this.count = count;
  }
}
