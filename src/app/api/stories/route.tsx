export async function GET(request: Request) {
    const users = await fetch("http://localhost:3000/users.json");
    const usersData = await users.json();
    const usersWithStories = usersData.filter((user: any) => user.stories.length > 0);

    return Response.json(usersWithStories);
}