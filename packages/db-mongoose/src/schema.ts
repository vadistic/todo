import mongoose, { Document, Schema, Query } from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { TaskBase } from '@todo/shared-db'

export const configureSchema = (schema: Schema) => {
  // add timestamps fields

  schema.set('timestamps', true)

  // add virtualised id getter
  schema.set('id', true)

  // no versioning
  schema.set('versionKey', false)

  // fix serialisers
  schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  })

  schema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  })

  // FIXME: super brute force
  schema.post(/^find/, function (this: Query<any>, doc, next) {
    const opts = (this as any)._mongooseOptions

    // only do it for lean queries where nothing can break
    if (opts.lean) {
      // handle findMany and such
      if (Array.isArray(doc)) {
        doc.forEach((el) => {
          el.id = el._id.toString()
          delete el._id
        })
      } else {
        doc.id = doc._id.toString()
        delete doc._id
      }
    }

    next()
  })

  return schema
}

export type TaskDocument = TaskBase & Document

export const TaskDef: mongoose.SchemaDefinition = {
  name: { type: String, required: true },
  content: String,
  finished: { type: Boolean, required: true, default: false },
}

export const TaskSchema = new mongoose.Schema(TaskDef)

configureSchema(TaskSchema)

TaskSchema.plugin(mongooseLeanVirtuals)

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema)
