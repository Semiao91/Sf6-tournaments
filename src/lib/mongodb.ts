import {MongoClient, Db} from "mongodb";

const uri: string = process.env.MONGODB_URI!;
const options: object = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export async function connectToDatabase(): Promise<{
  db: Db;
  client: MongoClient;
}> {
  if (!client) {
    client = await clientPromise;
  }
  const db = client.db("test");
  return {db, client};
}
