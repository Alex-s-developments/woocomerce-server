import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductOptionValueEntity } from './product-option-value.entity';
import { ProductSkuValueEntity } from './product-sku-value.entity';
import { ProductEntity } from './product.entity';

@Entity('product_option')
@ObjectType('ProductOption')
export class ProductOptionEntity extends BaseEntity {
  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => ProductEntity, (product) => product.options)
  product: ProductEntity;

  @OneToMany(
    () => ProductOptionValueEntity,
    (optionValue) => optionValue.option,
  )
  values: ProductOptionValueEntity[];

  @OneToMany(() => ProductSkuValueEntity, (skuValue) => skuValue.option)
  skuValues: ProductSkuValueEntity[];
}
