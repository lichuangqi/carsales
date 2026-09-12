import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Report } from '../reports/report.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: true })
  admin: boolean;
  @OneToMany(() => Report, (report) => report.user)
  reports: Relation<Report[]>;
  @AfterInsert()
  logInsert() {
    console.log('Insert User with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Update User with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Remove User with id', this.id);
  }
}
