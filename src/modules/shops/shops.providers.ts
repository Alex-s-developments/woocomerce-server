import { DataSource } from 'typeorm';
import { DB_PROVIDE } from 'src/database/database.constant';
import { ShopEntity } from './entities/shop.entity';
import { SHOP_REPOSITORY } from './shops.constants';

export const shopsProviders = [
  {
    provide: SHOP_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ShopEntity),
    inject: [DB_PROVIDE],
  },
];
