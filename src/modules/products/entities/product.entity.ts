import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IProduct } from '../interfaces/Product';
import { ProductOptionEntity } from './product-option.entity';
import { ProductSkuValueEntity } from './product-sku-value.entity';
import { ProductSkuEntity } from './product-sku.entity';

@Entity({ name: 'product' })
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductOptionEntity, (option) => option.product)
  options: ProductOptionEntity[];

  @OneToMany(() => ProductSkuEntity, (sku) => sku.product)
  skus: ProductSkuEntity[];

  @OneToMany(() => ProductSkuValueEntity, (val) => val.product)
  skuValues: ProductSkuValueEntity[];

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
