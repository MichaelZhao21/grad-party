import { genHash, randomBytes } from '$lib/server/random.js';

export async function POST({ request, cookies, locals }) {
    const body = (await request.json()) as User;
    const token = cookies.get("token");

    // Check if user is logged in
    if (!token) {
        return new Response("Token is not found", { status: 401 });
    }

    // Get the user from the database
    const user = await locals.db.collection("users").findOne<User>({ token });
    if (!user) {
        return new Response("Invalid token", { status: 401 });
    }

    // Check to see if the password has been changed
    if (body.password) {
        // Generate 16 character salt
        const salt = randomBytes(8);
        const hash = genHash(salt, body.password);

        body.password = `${salt}:${hash}`;
    } else {
        body.password = user.password;
    }

    // Update the user in the database
    await locals.db.collection("users").updateOne({ token }, { $set: body });

    // Update the token in the cookies
    cookies.set("token", token, { path: '/' });
    return new Response("", { status: 200 });
}