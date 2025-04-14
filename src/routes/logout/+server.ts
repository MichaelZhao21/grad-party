export async function POST({ cookies }) {
    // Delete the token cookie
    cookies.delete("token", { path: '/' });

    // Return a 200 response
    return new Response("", { status: 200 });
}
