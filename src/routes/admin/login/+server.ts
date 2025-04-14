import { checkAdminPass } from '$lib/server/users.js';

export async function POST({ request, cookies }) {
    const { pass } = (await request.json()) as AdminLogin;

    if (!pass) {
        return new Response("Password is required", { status: 400 });
    }

    // Compare to env
    if (!checkAdminPass(pass)) {
        return new Response("Invalid password", { status: 401 });
    }

    // Save pass
    cookies.set("adminpass", pass, { path: '/' });
    return new Response("", { status: 200 });
}
