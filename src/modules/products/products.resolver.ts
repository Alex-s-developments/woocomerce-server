import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GetProductsListArgs } from './dto/get-products-list.args';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { SuccessType } from 'src/shared/typeDefs/success.type';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ProductEntity } from './entities/product.entity';
import { ProductsListTypeDef as ProductsList } from './typeDefs/products-list.typeDef';
import { ProductOptionEntity } from './entities/product-option.entity';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProductEntity)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.create(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProductsList, { name: 'productsList' })
  async findAll(@Args() args: GetProductsListArgs): Promise<ProductsList> {
    const [items, count] = await Promise.all([
      this.productsService.findAll(args),
      this.productsService.count(),
    ]);

    return new ProductsList({
      items,
      count,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProductEntity, { name: 'product', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    const product = await this.productsService.findOne(id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.NOT_FOUND);

    return product;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProductEntity)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductEntity> {
    const product = await this.productsService.findOne(input.id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.BAD_REQUEST);

    const updatedProduct = await this.productsService.update(input);

    return updatedProduct;
  }

  @UseGuards(GqlAuthGuard)
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

  @ResolveField(() => [ProductOptionEntity], { name: 'optionsListRelation' })
  async findOptions(@Root() product: ProductEntity) {
    const options = await this.productsService.findOptions(product.id);
    return options;
  }
}
