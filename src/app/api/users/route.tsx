export async function GET() {
    const users = await fetch("http://localhost:3000/users.json");
    const usersData = await users.json();
    return Response.json(usersData);
}