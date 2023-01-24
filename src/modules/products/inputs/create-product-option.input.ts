import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumberString } from 'class-validator';
import { ProductOptionEntity } from '../entities/product-option.entity';
import { ProductEntity } from '../entities/product.entity';

@InputType()
export class CreateProductOptionInput {
  @Field(() => ID)
  @IsNumberString()
  productId: string | number;

  @Field(() => String, { description: 'product option' })
  option: string;
}

export const mapCreateProductOptionInputToOption = (
  input: CreateProductOptionInput,
) => {
  const productOption = new ProductOptionEntity();
  productOption.option = input.option;
  const product = new ProductEntity();
  product.id = +input.productId;
  productOption.product = product;
  return productOption;
};
