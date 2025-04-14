import { MONGODB_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGODB_URL);

// Connect to the database
export async function connect(): Promise<void> {
    await client.connect();
}

// Get the database
export function getDatabase() {
    return client.db('grad');
}
