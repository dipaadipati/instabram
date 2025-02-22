export async function GET() {
    const users = await fetch(process.env.HOST_URL + "/users.json");
    const usersData = await users.json();
    return Response.json(usersData);
}