import { getDatabase } from '$lib/server/mongo';
import { checkAdminPass } from '$lib/server/users';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<AdminData> = async ({ cookies }) => {
    const token = cookies.get("adminpass");
    const loggedIn = checkAdminPass(token);
    if (!loggedIn) {
        return { loggedIn: false };
    }

    const db = getDatabase();
    const users = await db.collection('users').find().project({ _id: 0, name: 1, rsvp: 1, bringing: 1, music: 1, paid: 1, phone: 1, relation: 1, email: 1, notes: 1 }).toArray();

    return { loggedIn, users: users as User[] };
}
