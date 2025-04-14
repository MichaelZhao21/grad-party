import type { Db } from "mongodb";

// Get a logged in user from the database and return them without the password
export async function getLoggedInUser(db: Db, token: string): Promise<User | null> {
    const user = await db.collection("users").findOne<User>({ token });
    if (!user) {
        return null;
    }

    delete user.password;

    return user;
}
