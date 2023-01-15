import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { ProductOptionValueEntity } from './product-option-value.entity';
import { ProductOptionEntity } from './product-option.entity';
import { ProductSkuEntity } from './product-sku.entity';
import { ProductEntity } from './product.entity';

@Entity('product_sku_value')
export class ProductSkuValueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.skuValues)
  product: ProductEntity;

  @ManyToOne(() => ProductSkuEntity, (sku) => sku.skuValues)
  sku: ProductSkuEntity;

  @ManyToOne(() => ProductOptionEntity, (option) => option.skuValues)
  option: ProductOptionEntity;

  @ManyToOne(() => ProductOptionValueEntity, (option) => option.skuValues)
  optionValue: ProductOptionValueEntity;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
