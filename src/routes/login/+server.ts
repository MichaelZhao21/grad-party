import { getDatabase } from '$lib/server/mongo';
import { genHash, randomBytes } from '$lib/server/random';

export async function POST({ request, cookies }) {
    const body = (await request.json()) as User;

    if (!body.email || !body.password) {
        return new Response("Email and password are required", { status: 400 });
    }

    // Make sure email is valid
    if (!body.email.includes('@')) {
        return new Response("Invalid email", { status: 400 });
    }

    const email = body.email.toLowerCase();
    const password = body.password;
    const db = getDatabase();

    // Check if user exists
    const user = await db.collection('users').findOne<User>({ email });

    // Generate token
    const token = randomBytes(16);

    // If the user exists and no password, simply log the user in
    if (user && !password) {
        db.collection('users').updateOne({ email }, { $set: { token } });
        cookies.set("token", token, { path: '/' });
        return new Response("", { status: 200 });
    }

    // If user not found, create user
    if (!user) {
        // Generate 16 character salt
        const salt = randomBytes(8);
        const hash = genHash(salt, body.password);

        await db.collection('users').insertOne({
            email,
            password: `${salt}:${hash}`,
            token
        });

        cookies.set("token", token, { path: '/' });
        return new Response("", { status: 200 });
    }

    // We know the password is not empty, so we can ignore the undef case
    const [salt, hash] = user.password?.split(':') || [null, null];
    if (!salt || !hash) {
        return new Response("Invalid user state, please contact admin", { status: 500 });
    }

    // Check if password is correct
    const checkHash = genHash(salt, password);
    if (checkHash !== hash) {
        return new Response("Invalid password", { status: 401 });
    }

    // Update token
    await db.collection('users').updateOne({ email }, { $set: { token } });
    cookies.set("token", token, { path: '/' });
    return new Response("", { status: 200 });
}
