/*
 * @Author: saber2pr
 * @Date: 2019-10-06 14:23:07
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-10-06 14:23:07
 */
import {
  MongoClient,
  Collection,
  MongoCallback,
  FilterQuery,
  UpdateQuery,
  UpdateWriteOpResult,
  DeleteWriteOpResultObject
} from "mongodb"

export const connect = (url: string) =>
  new Promise<MongoClient>((resolve, reject) =>
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => (err ? reject(err) : resolve(client))
    )
  )

export type InsertOneWriteOpResult<T> = Parameters<
  Collection<T>["insertOne"]
>["2"] extends MongoCallback<infer T>
  ? T
  : never

export type InsertWriteOpResult<T> = Parameters<
  Collection<T>["insert"]
>["2"] extends MongoCallback<infer T>
  ? T
  : never

export const insertOne = <T>(collection: Collection<T>, document: any) =>
  new Promise<InsertOneWriteOpResult<T>>((resolve, reject) =>
    collection.insertOne(document, (err, OpResult) =>
      err ? reject(err) : resolve(OpResult)
    )
  )

export const insertMany = <T>(collection: Collection<T>, document: any) =>
  new Promise<InsertWriteOpResult<T>>((resolve, reject) =>
    collection.insertMany(document, (err, OpResult) =>
      err ? reject(err) : resolve(OpResult)
    )
  )

export const deleteOne = <T>(collection: Collection<T>, selector: object) =>
  new Promise<DeleteWriteOpResultObject>((resolve, reject) =>
    collection.deleteOne(selector, (err, OpResult) =>
      err ? reject(err) : resolve(OpResult)
    )
  )

export const deleteMany = <T>(collection: Collection<T>, selector: object) =>
  new Promise<DeleteWriteOpResultObject>((resolve, reject) =>
    collection.deleteMany(selector, (err, OpResult) =>
      err ? reject(err) : resolve(OpResult)
    )
  )

export const findOne = <T>(collection: Collection<T>, selector: object) =>
  new Promise<T>((resolve, reject) =>
    collection.findOne(selector, (err, OpResult) =>
      err ? reject(err) : resolve(OpResult)
    )
  )

export const updateOne = <T>(
  collection: Collection<T>,
  filter: FilterQuery<T>,
  update: T | UpdateQuery<T>
) =>
  new Promise<UpdateWriteOpResult>((resolve, reject) =>
    collection.updateOne(filter, update, (err, OpResult) =>
      err ? reject(err) : resolve(OpResult)
    )
  )
