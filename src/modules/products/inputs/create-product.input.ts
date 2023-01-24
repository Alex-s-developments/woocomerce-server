import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNumberString } from 'class-validator';
import { ShopEntity } from 'src/modules/shops/entities/shop.entity';
import { ProductEntity } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field(() => ID)
  @IsNumberString()
  shopId: string | number;

  @Field(() => String, { description: 'product name' })
  name!: string;
}

export const mapCreateProductDtoToProduct = (
  input: CreateProductInput,
): ProductEntity => {
  const product = new ProductEntity();
  product.name = input.name;
  const shop = new ShopEntity();
  shop.id = +input.shopId;
  product.shop = shop;
  return product;
};
