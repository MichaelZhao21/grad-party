import { getDatabase } from '$lib/server/mongo.js';
import { getLoggedInUser } from '$lib/server/users.js';

export async function load({ cookies }): Promise<IndexProps> {
    const token = cookies.get("token");
    const db = getDatabase();

    if (!token) {
        return {
            loggedIn: false,
        }
    }

    const user = await getLoggedInUser(db, token);
    if (!user) {
        cookies.delete("token", { path: '/' });
        return {
            loggedIn: false,
        }
    }

    const attendees = await db.collection("users").find<User>({}).project({ _id: 0, name: 1, rsvp: 1 }).toArray();

    return {
        loggedIn: true,
        user,
        attendees: attendees as Attendee[],
    }
}