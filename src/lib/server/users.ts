import { ADMIN_PASS } from '$env/static/private';
import type { Db } from "mongodb";

// Get a logged in user from the database and return them without the password
export async function getLoggedInUser(db: Db, token: string): Promise<User | null> {
    const user = await db.collection("users").findOne<User>({ token });
    if (!user) {
        return null;
    }
    return user;
}

// Check if the admin password entered is correct
export function checkAdminPass(pass: string | undefined): boolean {
    if (!pass) return false;
    if (ADMIN_PASS !== pass) {
        return false;
    }
    return true;
}
