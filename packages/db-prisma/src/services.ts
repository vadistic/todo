import Client, { PrismaClient } from '@prisma/client'
import {
  TaskCreateOneArgs,
  TaskUpdateOneArgs,
  TaskDeleteOneArgs,
  ServicesBase,
} from '@todo/shared-db'

import * as Shared from '@todo/shared-db'
import { buildFilter, range } from './utils'

export class TaskService implements Shared.TaskServiceBase {
  constructor(public prisma: PrismaClient) {}

  async findOne(args: Shared.TaskFindOneArgs) {
    return this.prisma.task.findOne({ where: { id: args.where.id } })
  }

  // ────────────────────────────────────────────────────────────────────────────────

  private whereFilter = buildFilter<Shared.TaskWhereFilters, Client.TaskWhereInput>((where) => ({
    id: { $keys: ['ids'], $value: { in: where.ids } },
    name: { contains: where.name },
    content: { contains: where.content },
    finished: { equals: where.finished },
    createdAt: {
      $keys: ['createdAfter', 'createdBefore'],
      $value: range({ from: where.createdAfter, to: where.createdBefore }),
    },
    updatedAt: {
      $keys: ['updatedAfter', 'updatedBefore'],
      $value: range({ from: where.updatedAfter, to: where.updatedBefore }),
    },
  }))

  private findManyArgs = buildFilter<Shared.TaskFindManyArgs, Client.FindManyTaskArgs>((args) => {
    return {
      where: this.whereFilter(args.where),
    }
  })

  async findMany(args: Shared.TaskFindManyArgs) {
    const filter = this.findManyArgs(args)

    return this.prisma.task.findMany(filter)
  }

  async createOne(args: TaskCreateOneArgs) {
    return this.prisma.task.create({ data: args.data })
  }

  async updateOne(args: TaskUpdateOneArgs) {
    return this.prisma.task.update({ where: { id: args.where.id }, data: args.data })
  }

  async deleteOne(args: TaskDeleteOneArgs) {
    return this.prisma.task.delete({ where: { id: args.where.id } })
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export class Services implements ServicesBase {
  constructor(public prisma: PrismaClient) {}

  public task = new TaskService(this.prisma)
}
