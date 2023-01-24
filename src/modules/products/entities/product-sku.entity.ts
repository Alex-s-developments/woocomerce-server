import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, ManyToOne, OneToMany, Entity } from 'typeorm';
import { IProductSku } from '../interfaces/product-sku.interface';
import { ProductSkuValueEntity } from './product-sku-value.entity';
import { ProductEntity } from './product.entity';

@Entity('product_sku')
@ObjectType('ProductSku')
export class ProductSkuEntity extends BaseEntity implements IProductSku {
  @Column()
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @ManyToOne(() => ProductEntity, (product) => product.skus)
  product: ProductEntity;

  @OneToMany(() => ProductSkuValueEntity, (skuValue) => skuValue.sku)
  skuValues: ProductSkuValueEntity[];
}
