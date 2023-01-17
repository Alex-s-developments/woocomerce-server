import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { IProduct } from '../interfaces/product.interface';
import { ProductOptionEntity } from './product-option.entity';
import { ProductSkuValueEntity } from './product-sku-value.entity';
import { ProductSkuEntity } from './product-sku.entity';

@Entity({ name: 'product' })
@ObjectType('Product')
export class ProductEntity extends BaseEntity implements IProduct {
  @Column()
  @Field(() => String, { description: 'product name' })
  name: string;

  @OneToMany(() => ProductOptionEntity, (option) => option.product)
  @Field(() => ProductOptionEntity, { name: 'optionsListRelation' })
  options: ProductOptionEntity[];

  @OneToMany(() => ProductSkuEntity, (sku) => sku.product)
  skus: ProductSkuEntity[];

  @OneToMany(() => ProductSkuValueEntity, (val) => val.product)
  skuValues: ProductSkuValueEntity[];
}
