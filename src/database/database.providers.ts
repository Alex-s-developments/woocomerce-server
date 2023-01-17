import { ProductOptionValueEntity } from 'src/modules/products/entities/product-option-value.entity';
import { ProductOptionEntity } from 'src/modules/products/entities/product-option.entity';
import { ProductSkuValueEntity } from 'src/modules/products/entities/product-sku-value.entity';
import { ProductSkuEntity } from 'src/modules/products/entities/product-sku.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { ShopEntity } from 'src/modules/shops/entities/shop.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PROVIDE,
} from './database.constant';

export const databaseProviders = [
  {
    provide: DB_PROVIDE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: DB_TYPE,
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        entities: [
          UserEntity,
          ShopEntity,
          ProductEntity,
          ProductOptionEntity,
          ProductOptionValueEntity,
          ProductSkuEntity,
          ProductSkuValueEntity,
        ],
        synchronize: true,
      });

      try {
        await dataSource.initialize();
      } catch (err) {
        console.log('error connecting database', err);
      }
      return dataSource;
    },
  },
];
