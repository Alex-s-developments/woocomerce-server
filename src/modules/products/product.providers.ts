import { DB_PROVIDE } from 'src/database/database.constant';
import { DataSource } from 'typeorm';
import { ProductOptionValueEntity } from './entities/product-option-value.entity';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ProductSkuValueEntity } from './entities/product-sku-value.entity';
import { ProductSkuEntity } from './entities/product-sku.entity';
import { ProductEntity } from './entities/product.entity';
import {
  PRODUCT_OPTION_REPOSITORY,
  PRODUCT_OPTION_VALUE_REPOSITORY,
  PRODUCT_REPOSITORY,
  PRODUCT_SKU_REPOSITORY,
  PRODUCT_SKU_VALUE_REPOSITORY,
} from './product.constants';

export const productProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductEntity),
    inject: [DB_PROVIDE],
  },
  {
    provide: PRODUCT_OPTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductOptionEntity),
    inject: [DB_PROVIDE],
  },
  {
    provide: PRODUCT_OPTION_VALUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductOptionValueEntity),
    inject: [DB_PROVIDE],
  },
  {
    provide: PRODUCT_SKU_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductSkuEntity),
    inject: [DB_PROVIDE],
  },
  {
    provide: PRODUCT_SKU_VALUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductSkuValueEntity),
    inject: [DB_PROVIDE],
  },
];
