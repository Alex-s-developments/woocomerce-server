import { ObjectType, Field } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateEvent,
} from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { IShop } from '../interfaces/shop.interface';
import { getShopSlug } from '../shops.utils';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

@Entity('shop')
@ObjectType('Shop')
export class ShopEntity extends BaseEntity implements IShop {
  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true, nullable: false })
  @Field(() => String)
  slug: string;

  @ManyToOne(() => UserEntity, (user) => user.shops, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.shop)
  products: ProductEntity[];

  @BeforeInsert()
  private beforeInsert() {
    this.slug = getShopSlug(this.name);
  }

  @BeforeUpdate()
  private beforeUpdate(event: UpdateEvent<any>) {
    if (event.entity.name) {
      this.slug = getShopSlug(this.name);
    }
  }
}
