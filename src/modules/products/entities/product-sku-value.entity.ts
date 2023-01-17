import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ManyToOne, Entity } from 'typeorm';
import { ProductOptionValueEntity } from './product-option-value.entity';
import { ProductOptionEntity } from './product-option.entity';
import { ProductSkuEntity } from './product-sku.entity';
import { ProductEntity } from './product.entity';

@Entity('product_sku_value')
@ObjectType('ProductSkuValue')
export class ProductSkuValueEntity extends BaseEntity {
  @ManyToOne(() => ProductEntity, (product) => product.skuValues)
  product: ProductEntity;

  @ManyToOne(() => ProductSkuEntity, (sku) => sku.skuValues)
  sku: ProductSkuEntity;

  @ManyToOne(() => ProductOptionEntity, (option) => option.skuValues)
  option: ProductOptionEntity;

  @ManyToOne(() => ProductOptionValueEntity, (option) => option.skuValues)
  optionValue: ProductOptionValueEntity;
}
