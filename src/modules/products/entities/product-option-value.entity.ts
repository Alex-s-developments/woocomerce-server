import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductOptionEntity } from './product-option.entity';
import { ProductSkuValueEntity } from './product-sku-value.entity';

@Entity('product_option_value')
export class ProductOptionValueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => ProductOptionEntity, (option) => option.values)
  option: ProductOptionEntity;

  @OneToMany(() => ProductSkuValueEntity, (skuValue) => skuValue.option)
  skuValues: ProductSkuValueEntity[];

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
