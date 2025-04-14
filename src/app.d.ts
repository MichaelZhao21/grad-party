// See https://svelte.dev/docs/kit/types#app.d.ts

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface User {
		email: string;
		password: string;
		name: string;
		phone: string;
		rsvp: string;
		paid: string;
		relation: string;
		bringing: string;
		music: string;
		notes: string;
	}

	interface Attendee {
		name: string;
		rsvp: "yes" | "no" | "maybe";
	}

	interface Token {
		token: string;
	}

	interface IndexProps {
		loggedIn: boolean;
		user?: User
		attendees?: Attendee[]
	}

	interface AdminData {
		loggedIn: boolean;
		users?: User[];
	}

	interface AdminLogin {
		pass: string;
	}
}

export { };
