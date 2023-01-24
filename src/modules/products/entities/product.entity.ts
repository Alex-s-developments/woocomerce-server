import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { IProduct } from '../interfaces/product.interface';
import { ProductOptionEntity } from './product-option.entity';
import { ProductSkuValueEntity } from './product-sku-value.entity';
import { ProductSkuEntity } from './product-sku.entity';
import { ShopEntity } from 'src/modules/shops/entities/shop.entity';

@Entity({ name: 'product' })
@ObjectType('Product')
export class ProductEntity extends BaseEntity implements IProduct {
  @Column()
  @Field(() => String, { description: 'product name' })
  name: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  shop: ShopEntity;

  @OneToMany(() => ProductOptionEntity, (option) => option.product)
  @Field(() => ProductOptionEntity, { name: 'optionsListRelation' })
  options: ProductOptionEntity[];

  @OneToMany(() => ProductSkuEntity, (sku) => sku.product)
  skus: ProductSkuEntity[];

  @OneToMany(() => ProductSkuValueEntity, (val) => val.product)
  skuValues: ProductSkuValueEntity[];
}
