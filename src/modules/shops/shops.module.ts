import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ShopsService } from './shops.service';
import { ShopsResolver } from './shops.resolver';
import { shopsProviders } from './shops.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [...shopsProviders, ShopsResolver, ShopsService],
  exports: [...shopsProviders, ShopsService],
})
export class ShopsModule {}
