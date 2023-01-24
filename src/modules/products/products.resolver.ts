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
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';
import { GetProductsListArgs } from './args/get-products-list.args';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { SuccessType } from 'src/shared/typeDefs/success.type';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ProductEntity } from './entities/product.entity';
import { ProductsListTypeDef as ProductsList } from './typeDefs/products-list.typeDef';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ShopsService } from '../shops/shops.service';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ShopEntity } from '../shops/entities/shop.entity';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(
    private readonly productsSvc: ProductsService,
    private readonly shopsSvc: ShopsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProductEntity)
  async createProduct(
    @SessionUser() sessionUser: IJwtPayload,
    @Args('input') input: CreateProductInput,
  ) {
    const shop = await this.shopsSvc.findOne(+input.shopId);
    if (!shop)
      throw new HttpException('shop not exist', HttpStatus.BAD_REQUEST);
    if (shop.owner.id !== sessionUser.userId)
      throw new HttpException(
        'You do not have permissions for this operation',
        HttpStatus.UNAUTHORIZED,
      );

    const result = await this.productsSvc.create(input);
    const product = await this.productsSvc.findOne(result.id);
    return product;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProductsList, { name: 'productsList' })
  async findAll(@Args() args: GetProductsListArgs): Promise<ProductsList> {
    const [items, count] = await Promise.all([
      this.productsSvc.findAll(args),
      this.productsSvc.count(),
    ]);

    return new ProductsList({
      items,
      count,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProductEntity, { name: 'product', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    const product = await this.productsSvc.findOne(id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.NOT_FOUND);

    return product;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProductEntity)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductEntity> {
    const product = await this.productsSvc.findOne(input.id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.BAD_REQUEST);

    const updatedProduct = await this.productsSvc.update(input);

    return updatedProduct;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SuccessType)
  async removeProduct(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<SuccessType> {
    const product = await this.productsSvc.findOne(id);

    if (!product)
      throw new HttpException('product not exist', HttpStatus.BAD_REQUEST);

    const isDeleted = await this.productsSvc.remove(id);

    return {
      success: isDeleted,
    };
  }

  @ResolveField(() => [ProductOptionEntity], { name: 'optionsListRelation' })
  async findOptions(@Root() product: ProductEntity) {
    const options = await this.productsSvc.findOptions(product.id);
    return options;
  }

  @ResolveField(() => ShopEntity, { name: 'shopRelation' })
  async findShop(@Root() product: ProductEntity) {
    return this.shopsSvc.findOneByProduct(product.id);
  }
}
