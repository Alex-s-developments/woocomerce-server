import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType('Timestamps')
export class TimestampsEnitty {
  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { description: 'deleted at datetime', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn()
  @Field(() => Date, { description: 'created at datetime' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'updated at datetime' })
  updatedAt: Date;
}
