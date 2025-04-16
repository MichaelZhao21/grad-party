import { MONGODB_URL, NODE_ENV } from '$env/static/private';
import { MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // This is important to avoid creating multiple clients in dev mode
    // due to HMR (hot module reload)
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>;
}

if (!MONGODB_URL) {
    throw new Error('Please add your MONGODB_URL to .env');
}

if (NODE_ENV === 'development') {
    if (!globalThis._mongoClientPromise) {
        client = new MongoClient(MONGODB_URL);
        globalThis._mongoClientPromise = client.connect();
    }
    clientPromise = globalThis._mongoClientPromise;
} else {
    // In production, don't use global, just create a cached promise
    client = new MongoClient(MONGODB_URL);
    clientPromise = client.connect();
}

export default clientPromise;
