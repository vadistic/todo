import { TaskBase, ID, Nullable, DateTime, taskDefaults } from '@todo/lib-db'
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'

@Entity({ name: 'Task' })
export class TaskEntity extends BaseEntity implements TaskBase {
  @PrimaryGeneratedColumn('uuid')
  id!: ID

  @CreateDateColumn()
  createdAt!: DateTime

  @UpdateDateColumn()
  updatedAt!: DateTime

  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  content: Nullable<string>

  @Column('boolean', {
    default: taskDefaults.finished,
    // transformer: { to: (val: boolean) => (val ? 1 : 0), from: (val: number) => !!val },
  })
  finished!: boolean
}
