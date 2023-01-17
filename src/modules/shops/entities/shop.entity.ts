import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity } from 'typeorm';
import { IShop } from '../interfaces/shop.interface';

@Entity('shop')
@ObjectType('Shop')
export class ShopEntity extends BaseEntity implements IShop {
  @Field(() => String)
  name: string;
}
