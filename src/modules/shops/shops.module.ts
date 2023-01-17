import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ShopsService } from './shops.service';
import { ShopsResolver } from './shops.resolver';
import { shopsProviders } from './shops.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...shopsProviders, ShopsResolver, ShopsService],
})
export class ShopsModule {}
