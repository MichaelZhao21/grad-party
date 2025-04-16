import clientPromise from '$lib/server/mongo';

export async function handle({ event, resolve }) {
    try {
        const client = await clientPromise;
        event.locals.db = client.db('grad'); // or whatever db you want
    } catch (err) {
        console.error('MongoDB connection error:', err);

        // Handle the error as needed, e.g., return a 500 response
        return new Response('Internal Server Error', {
            status: 500,
            statusText: 'MongoDB connection error',
        });
    }

    return resolve(event);
}
