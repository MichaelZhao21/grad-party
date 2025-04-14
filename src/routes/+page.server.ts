import { getDatabase } from '$lib/server/mongo.js';
import { getLoggedInUser } from '$lib/server/users.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<IndexProps> = async ({ cookies }) => {
    const token = cookies.get("token");
    const db = getDatabase();

    if (!token) {
        return {
            loggedIn: false,
        }
    }

    // I don't want to deal with types smh
    const user: any = await getLoggedInUser(db, token);
    if (!user) {
        cookies.delete("token", { path: '/' });
        return {
            loggedIn: false,
        }
    }
    delete user._id;
    delete user.password;

    const attendees = await db.collection("users").find<User>({}).project({ _id: 0, name: 1, rsvp: 1 }).toArray();

    return {
        loggedIn: true,
        user,
        attendees: attendees as Attendee[],
    }
}