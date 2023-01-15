import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Entity,
} from 'typeorm';
import { ProductSkuValueEntity } from './product-sku-value.entity';
import { ProductEntity } from './product.entity';

@Entity('product_sku')
export class ProductSkuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @ManyToOne(() => ProductEntity, (product) => product.skus)
  product: ProductEntity;

  @OneToMany(() => ProductSkuValueEntity, (skuValue) => skuValue.sku)
  skuValues: ProductSkuValueEntity[];

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
