import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductsListType, ProductType } from './typeDefs/product.type';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GetProductsListArgs } from './dto/get-products-list.args';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SuccessType } from 'src/shared/typeDefs/success.type';

@Resolver(() => ProductType)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => ProductType)
  createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<ProductType> {
    return this.productsService.create(input);
  }

  @Query(() => ProductsListType, { name: 'productsList' })
  async findAll(@Args() args: GetProductsListArgs): Promise<ProductsListType> {
    const [items, count] = await Promise.all([
      this.productsService.findAll(args),
      this.productsService.count(),
    ]);

    return new ProductsListType({
      items,
      count,
    });
  }

  @Query(() => ProductType, { name: 'product', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    const product = await this.productsService.findOne(id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.NOT_FOUND);

    return product;
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductType> {
    const product = await this.productsService.findOne(input.id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.BAD_REQUEST);

    const updatedProduct = await this.productsService.update(input);

    return updatedProduct;
  }

  @Mutation(() => SuccessType)
  async removeProduct(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<SuccessType> {
    const product = await this.productsService.findOne(id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.BAD_REQUEST);

    const isDeleted = await this.productsService.remove(id);

    return {
      success: isDeleted,
    };
  }
}
