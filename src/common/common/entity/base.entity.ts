import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class Base {
  // key
  @PrimaryGeneratedColumn()
  id: number;

  // create time
  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  // update time
  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
}
