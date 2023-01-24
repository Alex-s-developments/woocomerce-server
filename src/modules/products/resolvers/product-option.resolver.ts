import { HttpException, HttpStatus } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { IJwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { ProductOptionEntity } from '../entities/product-option.entity';
import { CreateProductOptionInput } from '../inputs/create-product-option.input';
import { ProductsService } from '../products.service';

@Resolver(() => ProductOptionEntity)
export class ProductOptionResolver {
  constructor(private readonly productsSvc: ProductsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProductOptionEntity, { name: 'createProductOption' })
  async createOption(
    @SessionUser() sessionUser: IJwtPayload,
    @Args('input') input: CreateProductOptionInput,
  ) {
    const product = await this.productsSvc.findOne(+input.productId);
    if (!product)
      throw new HttpException('product not exist', HttpStatus.BAD_REQUEST);
    const result = await this.productsSvc.createOption(input);
    const option = await this.productsSvc.findOne(result.id);
    return option;
  }
}
