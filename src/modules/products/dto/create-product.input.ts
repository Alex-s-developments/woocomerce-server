import { InputType, Field } from '@nestjs/graphql';
import { ProductEntity } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'product name' })
  name!: string;
}

export const mapCreateProductDtoToProduct = (
  input: CreateProductInput,
): ProductEntity => {
  const product = new ProductEntity();
  product.name = input.name;
  return product;
};
