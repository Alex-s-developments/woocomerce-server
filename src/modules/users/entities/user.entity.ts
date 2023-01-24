import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  UpdateEvent,
} from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { hashPassword } from '../users.utils';
import { ShopEntity } from 'src/modules/shops/entities/shop.entity';

@Entity('user')
@ObjectType('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  @Field(() => String)
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => ShopEntity, (shop) => shop.owner)
  shops: ShopEntity[];

  @BeforeInsert()
  private async beforeInsert() {
    this.password = await hashPassword(this.password);
  }

  @BeforeUpdate()
  private async beforeUpdate(event: UpdateEvent<any>) {
    if (event.entity.password) {
      this.password = await hashPassword(this.password);
    }
  }
}
