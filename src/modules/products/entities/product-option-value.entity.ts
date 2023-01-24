import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IProductOptionValue } from '../interfaces/product-option-value.interface';
import { ProductOptionEntity } from './product-option.entity';
import { ProductSkuValueEntity } from './product-sku-value.entity';

@Entity('product_option_value')
@ObjectType('ProductOptionValue')
export class ProductOptionValueEntity
  extends BaseEntity
  implements IProductOptionValue
{
  @Column()
  @Field(() => String)
  value: string;

  @ManyToOne(() => ProductOptionEntity, (option) => option.values)
  option: ProductOptionEntity;

  @OneToMany(() => ProductSkuValueEntity, (skuValue) => skuValue.option)
  skuValues: ProductSkuValueEntity[];
}
