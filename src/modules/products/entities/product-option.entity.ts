import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductOptionValueEntity } from './product-option-value.entity';
import { ProductSkuValueEntity } from './product-sku-value.entity';
import { ProductEntity } from './product.entity';

@Entity('product_option')
export class ProductOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
