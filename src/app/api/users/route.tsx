export async function GET() {
    const users = await fetch("./users.json");
    const usersData = await users.json();
    return Response.json(usersData);
}