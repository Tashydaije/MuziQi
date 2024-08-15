import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGO_URI;
const client = new MongoClient(connectionString);

let db;

export const connectToServer = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const getDb = () => db;

export default getDb;