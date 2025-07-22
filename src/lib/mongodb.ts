import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is missing')
}

// ----- Mongoose bağlantısı (API & Model işlemleri için) -----
let cachedMongoose = (global as any).mongoose

if (!cachedMongoose) {
  cachedMongoose = { conn: null, promise: null }
  ;(global as any).mongoose = cachedMongoose
}

export async function connectMongo() {
  if (cachedMongoose.conn) return cachedMongoose.conn

  if (!cachedMongoose.promise) {
    cachedMongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cachedMongoose.conn = await cachedMongoose.promise
  return cachedMongoose.conn
}

// ----- MongoDBAdapter için clientPromise (NextAuth) -----
let clientPromise: Promise<MongoClient>

let globalWithMongoClient = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>
}

if (!globalWithMongoClient._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI)
  globalWithMongoClient._mongoClientPromise = client.connect()
}

clientPromise = globalWithMongoClient._mongoClientPromise!

export default clientPromise