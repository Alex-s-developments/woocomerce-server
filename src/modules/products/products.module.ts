import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { productProviders } from './product.providers';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports: [DatabaseModule, ShopsModule],
  providers: [...productProviders, ProductsResolver, ProductsService],
})
export class ProductsModule {}
